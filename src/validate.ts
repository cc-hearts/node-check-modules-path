import { platform } from 'os'

export function isMacOs() {
  return platform() === 'darwin'
}
