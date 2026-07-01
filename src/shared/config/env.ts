interface Config {
  baseUrl: string
  apiBaseUrl: string
  ssoUrl: string
}

export const config: Config = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  apiBaseUrl: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_URL}`,
  ssoUrl: import.meta.env.VITE_SSO_URL || '',
}

