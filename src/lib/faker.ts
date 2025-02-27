import { faker } from '@faker-js/faker'

export function randomFileName(): string {
  return faker.system.fileName()
}

export function randomFullNameEn(): string {
  return faker.person.fullName()
}

export function randomEmail(): string {
  return faker.internet.email()
}
