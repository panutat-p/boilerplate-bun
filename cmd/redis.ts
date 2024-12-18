import { createClient } from 'redis'

const redisUrl = `redis://localhost:6379`

const client = createClient({
  url: redisUrl,
})

client.on('connect', () => console.info('🟢 Connected to Redis'))
client.on('error', (err) => console.error('🔴 Failed to connect to Redis, err:', err))

await client.connect()

await Bun.sleep(2000) // 2s

await client.quit()
