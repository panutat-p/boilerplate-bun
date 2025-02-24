export type Config = {
  server: {
    port: number
  }

  mysql: {
    host: string
    port: number
    username: string
    password: string
    database: string
  }

  redis: {
    host: string
    port: number
    username: string
    password: string
    database: string
  }
}
