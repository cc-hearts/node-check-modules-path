import { isMacOs } from "./validate.js"
export const config = {
  // mac os
  exclude: ['Library', 'Applications']
}


// 是否前缀有点
export function isPrefixDot(path: string) {
  return path.startsWith('.')
}


export function validateDirName(dir: string) {
  if (isMacOs()) {
    return !isPrefixDot(dir) && !config.exclude.includes(dir)
  }
}
