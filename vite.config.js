import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/portfolio/',
    plugins: [react()],
    // server: {
    //     allowedHosts: ['2de1-74-72-0-203.ngrok-free.app'],
    // }
})