import { readFile, rm } from "node:fs/promises"
import { join } from "node:path"
export async function rmRf(path) {
  return await rm(path, { recursive: true, force: true })
}

try {
  let dirs = await readFile(join(process.cwd(), 'deps.json'), 'utf8')
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


