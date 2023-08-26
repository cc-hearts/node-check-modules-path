import { writeFile } from "node:fs/promises"
import { join } from 'node:path'

const _join = (...args: string[]) => join(process.cwd(), ...args)

export function writeDepsPath(path: string, deps: string[]) {
  writeFile(_join(path), JSON.stringify(deps, null, 2))
}