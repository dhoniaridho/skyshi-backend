import Knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

const DB = Knex({
  client: process.env.DB_CONNECTION ?? 'mysql',
  connection: {
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: +(process.env.DB_PORT ?? '3306'),
    database: process.env.DB_DATABASE ?? 'ahmadridhoni',
    user: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root'
  }
})

export { DB }
