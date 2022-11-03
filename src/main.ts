import express, { Request, Response } from 'express'
import { Routes } from './routes'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { response } from './helpers/response'
dotenv.config()

function bootstrap() {
  const app = express()

  app.listen(3000, '0.0.0.0', () => {
    console.log('Server is started at port 3000')
  })

  app.use(express.json())

  Routes.forEach((route) => {
    app.use(route)
  })

  app.use('*', (req: Request, res: Response) => {
    return response(req, res).json(null, 404, 'Not Found')
  })
}

bootstrap()
