import { z } from 'zod'

export function validateIdentityNo(no: string): string {
  const schema = z.string().length(13)
  return schema.parse(no)
}
