import { copyFileSync, mkdirSync, statSync, writeFileSync } from 'node:fs'

/**
 * После сборки раскладываем готовый одиночный файл в два места:
 *  • bubble-tea-love.html — чтобы переслать одним файлом;
 *  • docs/index.html      — папку docs/ раздаёт GitHub Pages.
 */
const src = 'dist/index.html'

copyFileSync(src, 'bubble-tea-love.html')

mkdirSync('docs', { recursive: true })
copyFileSync(src, 'docs/index.html')
writeFileSync('docs/.nojekyll', '') // чтобы Pages не прогонял файл через Jekyll

const mb = (statSync(src).size / 1024 / 1024).toFixed(2)
console.log(`\n  ✓ bubble-tea-love.html и docs/index.html — ${mb} МБ.`)
console.log('    docs/ — это то, что раздаёт GitHub Pages.\n')
