import { isMacOs } from './validate.js'

function getExcludeFileDir() {
  if (isMacOs()) {
    return ['Library', 'Applications', 'app.asar.unpacked']
  }

  return []
}

// 是否前缀有点
export function isPrefixDot(path: string) {
  return path.startsWith('.')
}

export function validateDirName(dir: string) {
  if (isMacOs()) {
    return !isPrefixDot(dir) && !getExcludeFileDir().includes(dir)
  }
  return true
}
