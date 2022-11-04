import express, { Request, Response } from 'express'
import { Modules } from './modules/app.module'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { response } from './helpers/response'
import cors from 'cors'
dotenv.config()

function bootstrap() {
  const app = express()

  app.listen(3030, '0.0.0.0', () => {
    console.log('Server is started at port 3030')
  })

  app.use(express.json())
  app.use(
    cors({
      allowedHeaders: '*',
      origin: '*'
    })
  )

  Modules.forEach((module) => {
    app.use(module)
  })

  app.get('/', (req: Request, res: Response) => {
    return res.json({
      message: 'Welcome to API TODO'
    })
  })

  app.get('*', (req: Request, res: Response) => {
    return response(req, res).json(null, 404, 'Not Found')
  })
}

bootstrap()
