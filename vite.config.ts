import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    // Relative base works across any GitHub Pages repo path
    base: './',
    plugins: [react()],
    define: {
      'process.env.REACT_APP_N8N_CHATBOT_URL': JSON.stringify(env.REACT_APP_N8N_CHATBOT_URL),
      'process.env.REACT_APP_N8N_REVUE_URL': JSON.stringify(env.REACT_APP_N8N_REVUE_URL),
    },
    server: {
      proxy: {
        '/api/revue': {
          target: 'https://gnosiss.app.n8n.cloud',
          changeOrigin: true,
          secure: true,
          rewrite: (path: string) => path.replace(/^\/api\/revue/, '/webhook-test/revue'),
        },
      },
    },
  }
})
