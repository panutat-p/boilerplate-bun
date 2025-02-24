import { z } from 'zod'

export const ConfigSchema = z.object({
  server: z.object({
    port: z.number().min(1).max(65535),
  }),

  mysql: z.object({
    host: z.string().min(1),
    port: z.number().int().min(1).max(65535),
    username: z.string(),
    password: z.string(),
    database: z.string().min(1),
  }),

  redis: z.object({
    host: z.string().min(1),
    port: z.number().int().min(1).max(65535),
    username: z.string().optional(),
    password: z.string().optional(),
    database: z.string().min(1),
  }),
})

export type Config = z.infer<typeof ConfigSchema>
