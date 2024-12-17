import { randomFullNameEn } from '../src/faker'
import { getUsers } from '../src/http'
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

var b = validateIdentityNo('1000000000001')
console.info('b:', b)

console.info()

const users = await getUsers()
console.info('users:', users)
