import { randomFullNameEn } from '../src/faker'
import { ksuid } from '../src/ksuid'
import { now } from '../src/luxon'
import { validateIdentityNo } from '../src/zod'

console.info(now())

for (let i = 0; i < 2; i++) {
  console.info('now:', ksuid())
}

console.info()

for (let i = 0; i < 10; i++) {
  console.info('ksuid:', ksuid())
}

console.info()

for (let i = 0; i < 10; i++) {
  console.info(randomFullNameEn())
}

console.info()

var b = validateIdentityNo('10000000000001')
console.info('b:', b)
