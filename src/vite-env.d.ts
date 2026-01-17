/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_CHATBOT_URL?: string
  readonly VITE_N8N_REVUE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_N8N_CHATBOT_URL?: string
    REACT_APP_N8N_REVUE_URL?: string
  }
}

interface Process {
  env: NodeJS.ProcessEnv
}

declare var process: Process
