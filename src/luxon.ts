import { DateTime } from 'luxon'

export function now(): string {
  return DateTime.local().toISO()
}

export function toRFC3339(d: DateTime): string {
  return d.toISODate() || ''
}

export function parse(s: string): DateTime {
  return DateTime.fromISO(s)
}
