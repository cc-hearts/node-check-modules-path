import { isMacOs, isWindow } from './validate.js'

function getExcludeFileDir() {
  if (isMacOs()) {
    return ['Library', 'Applications', 'app.asar.unpacked']
  } else if (isWindow()) {
    return ['$RECYCLE.BIN']
  }

  return []
}

// 是否前缀有点
export function isPrefixDot(path: string) {
  return path.startsWith('.')
}

export function validateDirName(dir: string) {
  if (isMacOs() || isWindow()) {
    return !isPrefixDot(dir) && !getExcludeFileDir().includes(dir)
  }
  return true
}
