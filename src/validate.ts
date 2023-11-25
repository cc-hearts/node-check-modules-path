import { platform } from 'os'

export function isMacOs() {
  return platform() === 'darwin'
}

export function isWindow() {
  return platform() === 'win32'
}
