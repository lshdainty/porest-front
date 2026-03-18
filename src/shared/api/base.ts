import { toast } from '@/shared/ui/shadcn/sonner'
import { config } from '@/shared/config'
import axios, { type AxiosError, type AxiosResponse } from 'axios'
import type { ApiErrorResponse } from '@/shared/types/api'

const baseURL = config.apiBaseUrl

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config: any) => {
    // i18n 언어 설정을 Accept-Language 헤더로 전달 (서버 다국어 지원)
    const language = localStorage.getItem('i18nextLng')
    if (language) {
      config.headers['Accept-Language'] = language
    }

    return config
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

apiClient.interceptors.response.use(
  (resp: AxiosResponse) => {
    // 성공 응답은 그대로 data 부분만 반환
    return resp.data
  },
  async (err: AxiosError<ApiErrorResponse>) => {
    const message = err.response?.data?.message || err.message || 'An unknown error occurred.'
    toast.error(message)

    // 401 Unauthorized 에러 발생 시 로그인 페이지로 리다이렉트
    if (err.response?.status === 401) {
      // 현재 페이지가 로그인/콜백 페이지가 아닐 때만 리다이렉트
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/auth/callback')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)
