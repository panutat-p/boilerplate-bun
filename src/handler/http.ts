export function health(req: Request): Response {
  return Response.json({ status: 'OK' })
}

export function getFruits(req: Request): Response {
  return Response.json({
    data: ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'],
  })
}

export async function postFruits(req: Request): Promise<Response> {
  const payload = await req.json()
  console.log('req:', payload)
  return Response.json({ message: 'Fruit added' })
}
