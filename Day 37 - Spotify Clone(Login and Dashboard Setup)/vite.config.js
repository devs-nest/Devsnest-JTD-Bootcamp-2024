import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {

    return {
        // vite config
        root: "src",
        server: {
            port: 3000
        }
    }
})