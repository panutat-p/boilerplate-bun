type User = {
  id: number
  name: string
  email: string
  gender: string
  status: string
}

export async function getUsers(): Promise<User[]> {
  const req = new Request('https://gorest.co.in/public/v2/users')
  const res = await fetch(req)
  return res.json()
}
