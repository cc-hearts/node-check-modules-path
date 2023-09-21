import { writeFile } from "node:fs/promises"

export function writeDepsPath(path: string, deps: string[]) {
  writeFile(path, JSON.stringify(deps, null, 2))
}