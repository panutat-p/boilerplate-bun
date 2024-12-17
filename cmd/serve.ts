import { health, getFruits, postFruits } from '../src/handler/http'

const server = Bun.serve({
  port: process.env.PORT,
  hostname: '0.0.0.0', // localhost

  async fetch(req, server) {
    const path = new URL(req.url).pathname

    // GET /
    if (req.method === 'GET' && path === '/') return health(req)

    // GET /health
    if (req.method === 'GET' && path === '/health') return health(req)

    // GET /fruits
    if (req.method === 'GET' && path === '/fruits') return getFruits(req)

    // POST /fruits
    if (req.method === 'POST' && path === '/fruits') return await postFruits(req)

    // 404
    return new Response('Page not found', { status: 404 })
  },
})

console.log(`Listening on ${server.url}`)
