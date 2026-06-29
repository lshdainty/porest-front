import { apiClient } from '@/shared/api'
import type { ApiResponse } from '@/shared/types/api'
import type { GetLoginCheck, TokenExchangeResponse } from '@/entities/session/model/types'

export const sessionApi = {
  /**
   * SSO 토큰을 HR 토큰으로 교환
   * SSO에서 발급한 JWT를 HR 서비스용 JWT로 교환합니다.
   */
  exchangeToken: async (ssoToken: string): Promise<TokenExchangeResponse> => {
    const resp: ApiResponse<TokenExchangeResponse> = await apiClient.request({
      method: 'post',
      url: `/auth/exchange`,
      data: { ssoToken }
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  /**
   * OAuth2 인가코드(code)를 HR 토큰으로 교환 (PKCE)
   * SSO 로그인 후 받은 일회용 code 와 code_verifier 로 HR JWT(HttpOnly 쿠키)를 발급받습니다.
   */
  exchangeCode: async (params: {
    code: string
    codeVerifier: string
    redirectUri: string
  }): Promise<TokenExchangeResponse> => {
    const resp: ApiResponse<TokenExchangeResponse> = await apiClient.request({
      method: 'post',
      url: `/auth/exchange-code`,
      data: params
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },

  /**
   * 로그아웃 (HttpOnly 쿠키 삭제)
   */
  logout: async (): Promise<void> => {
    await apiClient.request({
      method: 'post',
      url: `/auth/logout`
    })
  },

  /**
   * 로그인 사용자 정보 조회 (HttpOnly 쿠키 기반)
   * JWT 토큰이 쿠키로 자동 전송되어 사용자 정보를 조회합니다.
   */
  getLoginCheck: async (): Promise<GetLoginCheck> => {
    const resp: ApiResponse<GetLoginCheck> = await apiClient.request({
      method: 'get',
      url: `/login/check`
    })

    if (!resp.success) throw new Error(resp.message)

    return resp.data
  },
}
