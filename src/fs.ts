import { writeFile } from 'node:fs/promises'

export async function writeDepsPath(path: string, deps: string[]) {
  return writeFile(path, JSON.stringify(deps, null, 2))
}
