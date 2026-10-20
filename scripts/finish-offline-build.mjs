import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

await copyFile('offline-index.html', 'offline-dist/index.html')

const cssPath = 'offline-dist/jingju-site.css'
const assetsDir = path.join('offline-dist', 'assets')
const fontsDir = path.join(assetsDir, 'fonts')
const licensesDir = path.join('offline-dist', 'licenses')
await mkdir(fontsDir, { recursive: true })
await mkdir(licensesDir, { recursive: true })

const originalCss = await readFile(cssPath, 'utf8')
const fontDataUrls = [...originalCss.matchAll(/url\((?:"|')?(data:font\/woff2;base64,[^)"']+)(?:"|')?\)/g)]

for (let index = 0; index < fontDataUrls.length; index += 1) {
  const dataUrl = fontDataUrls[index][1]
  const fileName = `font-${String(index + 1).padStart(3, '0')}.woff2`
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1)
  await writeFile(path.join(fontsDir, fileName), Buffer.from(base64, 'base64'))
}

let fontIndex = 0
const cssWithRelativeFonts = originalCss.replace(/url\((?:"|')?(data:font\/woff2;base64,[^)"']+)(?:"|')?\)/g, () => {
  fontIndex += 1
  return `url(./assets/fonts/font-${String(fontIndex).padStart(3, '0')}.woff2)`
})
const cssWithRelativeAssets = cssWithRelativeFonts.replace(/url\((?:"|')?data:image\/png;base64,[^)"']+(?:"|')?\)/g, 'url(./assets/jingju-hero.png)')
await writeFile(cssPath, cssWithRelativeAssets)

await copyFile('src/fonts/OFL-Noto-Serif-SC.txt', path.join(licensesDir, 'OFL-Noto-Serif-SC.txt'))
await copyFile('src/fonts/OFL-Manrope.txt', path.join(licensesDir, 'OFL-Manrope.txt'))
