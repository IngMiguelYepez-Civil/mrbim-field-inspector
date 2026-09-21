#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

function findWebIfcDir(startDir) {
  let dir = startDir
  while (dir && dir !== '/') {
    const candidate = join(dir, 'node_modules', 'web-ifc')
    if (existsSync(join(candidate, 'web-ifc.wasm'))) return candidate

    const bunStore = join(dir, 'node_modules', '.bun')
    if (existsSync(bunStore)) {
      const bunPackage = readdirSync(bunStore).find((name) => name.startsWith('web-ifc@'))
      if (bunPackage) {
        const nestedCandidate = join(bunStore, bunPackage, 'node_modules', 'web-ifc')
        if (existsSync(join(nestedCandidate, 'web-ifc.wasm'))) return nestedCandidate
      }
    }
    dir = resolve(dir, '..')
  }
  return null
}

const webIfcDir = findWebIfcDir(import.meta.dirname)
if (!webIfcDir) {
  console.warn('[mrbim-editor] web-ifc package not found — WASM copy skipped.')
  process.exit(0)
}

const publicDir = join(import.meta.dirname, '..', 'public')
mkdirSync(publicDir, { recursive: true })

for (const name of ['web-ifc.wasm', 'web-ifc-mt.wasm', 'web-ifc-node.wasm']) {
  const source = join(webIfcDir, name)
  const destination = join(publicDir, name)
  const sourceSize = statSync(source).size
  const destinationSize = existsSync(destination) ? statSync(destination).size : 0

  if (sourceSize === destinationSize) continue
  copyFileSync(source, destination)
  console.log(`[mrbim-editor] copied ${name} (${(sourceSize / 1024).toFixed(0)} KB)`)
}
