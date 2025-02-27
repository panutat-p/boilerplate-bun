import { Elysia, t } from 'elysia'
import { randomFileName } from '../lib/faker'
const uploadController = new Elysia()

  .post(
    '/upload',
    async ({ body }) => {
      console.log('file_name:', body.file.name)
      console.log('file_type:', body.file.type)

      const fileType = body.file.type.split('/')[1]
      const newFileName = randomFileName()
      const fullPath = `./public/${newFileName}.${fileType}`

      await Bun.write(fullPath, body.file)

      return {
        message: 'File uploaded successfully',
        fullPath: fullPath,
      }
    },
    {
      body: t.Object({
        file: t.File({
          format: 'image/*',
          error: () => 'Invalid file',
        }),
      }),
    }
  )

  .post(
    '/example',
    async ({ body }) => {
      console.log('body:', body)
    },
    {
      body: t.Object({
        file: t.File({
          format: 'image/*',
          error: () => 'Invalid file',
        }),
      }),
    }
  )

export default uploadController
