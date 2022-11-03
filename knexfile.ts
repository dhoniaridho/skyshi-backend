// Update with your config settings.

import path from 'path'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '.env' })

interface KnexConfig {
  [key: string]: object
}

const config: KnexConfig = {
  development: {
    client: process.env.DB_CONNECTION ?? 'mysql',
    connection: {
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: process.env.DB_PORT ?? '3306',
      database: process.env.DB_DATABASE ?? 'ahmadridhoni',
      user: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migration',
      directory: path.resolve(__dirname, 'src', 'databases', 'migrations')
    }
  },

  staging: {
    client: process.env.DB_CONNECTION ?? 'mysql',
    connection: {
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: process.env.DB_PORT ?? '3306',
      database: process.env.DB_DATABASE ?? 'ahmadridhoni',
      user: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migration',
      directory: path.resolve(__dirname, 'src', 'databases', 'migrations')
    }
  },

  production: {
    client: process.env.DB_CONNECTION ?? 'mysql',
    connection: {
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: process.env.DB_PORT ?? '3306',
      database: process.env.DB_DATABASE ?? 'ahmadridhoni',
      user: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migration',
      directory: path.resolve(__dirname, 'src', 'databases', 'migrations')
    }
  }
}
module.exports = config
