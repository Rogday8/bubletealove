import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Сборка складывается в один index.html: его можно открыть двойным кликом,
// без сервера. Картинки лежат рядом, в dist/media — поэтому base относительный.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
  build: {
    // картинки уезжают в data:URI — на выходе один index.html, который можно
    // переслать одним файлом, и он откроется на любом компьютере
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
})
