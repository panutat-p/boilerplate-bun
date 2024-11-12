import { DateTime } from 'luxon'

export function now(): string {
  return DateTime.local().toISO()
}
