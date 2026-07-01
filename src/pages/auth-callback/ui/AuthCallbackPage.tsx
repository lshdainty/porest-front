import Loading from '@/shared/ui/loading/Loading';
import { sessionApi } from '@/entities/session';
import { getCodeVerifier, getSavedState, clearPkce } from '@/features/auth/lib/pkce';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * SSO 인증 콜백 페이지
 * SSO에서 인증 완료 후 리다이렉트되어 JWT 토큰을 처리합니다.
 * SSO 토큰을 HR 토큰으로 교환하여 저장합니다.
 */
const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  // StrictMode/재렌더로 effect 가 2번 돌아도 일회용 code 를 단 한 번만 교환하도록 가드
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    const handleCallback = async () => {
      // 신규: OAuth2 Authorization Code + PKCE (?code=&state=)
      const query = new URLSearchParams(window.location.search);
      const code = query.get('code');
      if (code) {
        const returnedState = query.get('state');
        const savedState = getSavedState();
        const verifier = getCodeVerifier();
        // verifier 없거나 state(CSRF) 불일치 시 거부
        if (!verifier || (savedState && returnedState && savedState !== returnedState)) {
          clearPkce();
          setError('인증 상태 검증에 실패했습니다.');
          setTimeout(() => navigate('/login', { replace: true }), 3000);
          return;
        }
        try {
          const redirectUri = `${window.location.origin}/auth/callback`;
          await sessionApi.exchangeCode({ code, codeVerifier: verifier, redirectUri });
          clearPkce();
          window.history.replaceState({}, '', window.location.pathname);
          navigate('/dashboard', { replace: true });
        } catch (err) {
          console.error('Code exchange failed:', err);
          clearPkce();
          setError(
            err instanceof Error
              ? err.message
              : 'HR 서비스 접근 권한이 없거나 인가코드 교환에 실패했습니다.'
          );
          setTimeout(() => navigate('/login', { replace: true }), 3000);
        }
        return;
      }

      // code 가 없으면 인증 실패 처리
      setError('인증 토큰을 받지 못했습니다.');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-600 mb-2">인증 실패</h1>
          <p className="text-muted-foreground">{error}</p>
          <p className="text-sm text-muted-foreground mt-4">
            잠시 후 로그인 페이지로 이동합니다...
          </p>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export { AuthCallbackPage };
