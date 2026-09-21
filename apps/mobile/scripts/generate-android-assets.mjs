import { mkdir, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const mobileRoot = resolve(import.meta.dirname, '..')
const iconSvg = await readFile(resolve(mobileRoot, '../editor/public/icons/mrbim-icon.svg'))
const resources = resolve(mobileRoot, 'android/app/src/main/res')

const iconSizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 }
const foregroundSizes = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 }

for (const [density, size] of Object.entries(iconSizes)) {
  const directory = resolve(resources, `mipmap-${density}`)
  await mkdir(directory, { recursive: true })
  const icon = await sharp(iconSvg).resize(size, size).png().toBuffer()
  await sharp(icon).toFile(resolve(directory, 'ic_launcher.png'))
  await sharp(icon).toFile(resolve(directory, 'ic_launcher_round.png'))
}

for (const [density, size] of Object.entries(foregroundSizes)) {
  const directory = resolve(resources, `mipmap-${density}`)
  await mkdir(directory, { recursive: true })
  await sharp(iconSvg).resize(size, size).png().toFile(resolve(directory, 'ic_launcher_foreground.png'))
}

const splashes = {
  'drawable/splash.png': [480, 320],
  'drawable-land-mdpi/splash.png': [480, 320],
  'drawable-land-hdpi/splash.png': [800, 480],
  'drawable-land-xhdpi/splash.png': [1280, 720],
  'drawable-land-xxhdpi/splash.png': [1600, 960],
  'drawable-land-xxxhdpi/splash.png': [1920, 1280],
  'drawable-port-mdpi/splash.png': [320, 480],
  'drawable-port-hdpi/splash.png': [480, 800],
  'drawable-port-xhdpi/splash.png': [720, 1280],
  'drawable-port-xxhdpi/splash.png': [960, 1600],
  'drawable-port-xxxhdpi/splash.png': [1280, 1920],
}

for (const [relativePath, [width, height]] of Object.entries(splashes)) {
  const destination = resolve(resources, relativePath)
  const logoSize = Math.round(Math.min(width, height) * 0.42)
  const logo = await sharp(iconSvg).resize(logoSize, logoSize).png().toBuffer()
  await mkdir(dirname(destination), { recursive: true })
  await sharp({
    create: { width, height, channels: 4, background: '#111827' },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toFile(destination)
}
