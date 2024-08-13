// From https://vitejs.dev/guide/env-and-mode.html
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_LOGIN_URL: string
  readonly VITE_STORAGE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
