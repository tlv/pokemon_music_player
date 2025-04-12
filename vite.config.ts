import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8000,
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    base: '/pokemon_music_player/',
    assetsInclude: ['**/*.mp3']
}) 