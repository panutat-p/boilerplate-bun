import KSUID from 'ksuid'

export function ksuid(): string {
  return KSUID.randomSync().string
}
