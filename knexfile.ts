// Update with your config settings.

import path from 'path'

interface KnexConfig {
  [key: string]: object
}

const config: KnexConfig = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      database: 'ahmadridhoni',
      user: 'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'src', 'databases', 'migrations')
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
module.exports = config
