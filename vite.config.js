import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['aws-amplify', '@aws-amplify/ui-react']
  },
  server: {
    port:5174,
    proxy: {
      '/api': {
        target: 'https://90l96cv8i5.execute-api.ap-south-1.amazonaws.com/prod/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      },
      '/user_signup': { 
        target: 'https://zsvsax9j10.execute-api.ap-south-1.amazonaws.com/', 
        changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/signin-api/, ''),
        secure: false 
      },
      '/loggout_api': { 
        target: 'https://ne5134ird4.execute-api.ap-south-1.amazonaws.com/', 
        changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/signin-api/, ''),
        secure: false 
      },
      '/user': { 
        target: 'https://qhp2v5ijya.execute-api.ap-south-1.amazonaws.com/search_histroy_api/', 
        changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/signin-api/, ''),
        secure: false 
      },
      '/inactive': { 
        target: 'https://fx9bprfh8h.execute-api.ap-south-1.amazonaws.com/prod/users/', 
        changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/signin-api/, ''),
        secure: false 
      },
      '/users': { 
        target: 'https://fx9bprfh8h.execute-api.ap-south-1.amazonaws.com/prod/users/', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, ''),
        secure: false 
      }
    },
  }
})
