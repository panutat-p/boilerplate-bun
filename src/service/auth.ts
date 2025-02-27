import { randomFullNameEn, randomEmail } from '../lib/faker'

type User = {
  id: number
  name: string
  email: string
  password: string
}

type ResultLogIn = {
  id?: number
  error?: string
}

type ResultRegister = {
  id?: number
  error?: string
}

const users: User[] = [
  {
    id: 1,
    name: randomFullNameEn(),
    email: randomEmail(),
    password: await Bun.password.hash('1234'),
  },
  {
    id: 2,
    name: randomFullNameEn(),
    email: randomEmail(),
    password: await Bun.password.hash('1234'),
  },
  {
    id: 3,
    name: randomFullNameEn(),
    email: randomEmail(),
    password: await Bun.password.hash('1234'),
  },
]

export async function logIn(email: string, password: string): Promise<ResultLogIn> {
  try {
    const u = users.find((u) => u.email === email)
    if (!u) {
      return { error: 'User not found' }
    }

    const isMatch = await Bun.password.verify(password, u.password)
    if (!isMatch) {
      return { error: 'Invalid Email or Password' }
    }

    return { 
        id: u.id,
     }
  } catch (e) {
    throw new Error('User not found')
  }
}

export async function register(name: string, email: string, password: string): Promise<ResultRegister> {
  const isFound = users.find((u) => u.email === email)
  if (isFound) {
    return { error: 'User already exists' }
  }

  const hashedPassword = await Bun.password.hash(password)
  const newUser = { id: users.length + 1, name, email, password: hashedPassword }
  users.push(newUser)

  return { id: newUser.id }
}

export async function getUserById(id: number): Promise<User | undefined> {
  return users.find((u) => u.id === id)
}
