// Update with your config settings.

import path from 'path'
import { Config } from './src/config/env'

interface KnexConfig {
  [key: string]: object
}

const config: KnexConfig = {
  development: {
    client: Config.DB.client,
    connection: {
      host: Config.DB.connection.host,
      port: Config.DB.connection.port,
      database: Config.DB.connection.database,
      user: Config.DB.connection.user,
      password: Config.DB.connection.password
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
    client: Config.DB.client,
    connection: {
      host: Config.DB.connection.host,
      port: Config.DB.connection.port,
      database: Config.DB.connection.database,
      user: Config.DB.connection.user,
      password: Config.DB.connection.password
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
    client: Config.DB.client,
    connection: {
      host: Config.DB.connection.host,
      port: Config.DB.connection.port,
      database: Config.DB.connection.database,
      user: Config.DB.connection.user,
      password: Config.DB.connection.password
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
