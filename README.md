# boilerplate-bun

https://github.com/panutat-p/boilerplate-bun

## Set up

```sh
brew install oven-sh/bun/bun
```

```sh
curl -fsSL https://bun.sh/install | bash
```

## Docs

- https://bun.sh/docs/cli/init
- https://bun.sh/docs/cli/add

## Packages

```sh
bun add luxon
bun add -D @types/luxon
bun add drizzle-orm mysql2
bun add -D drizzle-kit
```

## SQL

- https://github.com/drizzle-team/drizzle-orm
- https://github.com/knex/knex
- https://github.com/kysely-org/kysely

## Drizzle

- https://orm.drizzle.team/docs/get-started/mysql-existing
- Drizzle is not typed safe query
  - https://github.com/thetutlage/meta/discussions/8

```sh
bun add dotenv drizzle-orm mysql2
bun add -D drizzle-kit tsx
```

## Faker

https://fakerjs.dev/guide

```sh
bun add @faker-js/faker
```
