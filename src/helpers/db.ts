import Knex from 'knex'
import * as dotenv from 'dotenv'
import { Config } from '../config/env'
dotenv.config()

const DB = Knex({
  client: Config.DB.client,
  connection: {
    host: Config.DB.connection.host,
    port: Config.DB.connection.port,
    database: Config.DB.connection.database,
    user: Config.DB.connection.user,
    password: Config.DB.connection.password
  }
})

export { DB }
