import { readFile, rm } from "node:fs/promises"
import { resolve } from "node:path"
import { getCurrentPath } from "./deps"

export async function rmRf(path: string) {
  return await rm(path, { recursive: true, force: true })
}

try {
  const currentPath = await getCurrentPath()
  const depsPath = resolve(currentPath, '..', 'deps.json')
  let dirs = await readFile(resolve(depsPath, 'deps.json'), 'utf8')
  dirs = JSON.parse(dirs)
  if (Array.isArray(dirs)) {
    for (const dir of dirs) {
      await rmRf(dir)
      console.log(`removed ${dir} successfully`);
    }
  }
} catch (e) {
  console.log('error removing deps:', e);
}


