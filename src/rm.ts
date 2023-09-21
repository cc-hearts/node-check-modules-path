import { findUpPkg } from "@cc-heart/utils-service"
import { readFile, rm } from "node:fs/promises"
import { join } from "node:path"

export async function rmRf(path: string) {
  return await rm(path, { recursive: true, force: true })
}

try {
  const cwd = process.cwd()
  const currentPath = await findUpPkg(cwd) || cwd
  const depsPath = join(currentPath, 'deps.json')
  let dirs = await readFile(join(depsPath, 'deps.json'), 'utf8')
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


