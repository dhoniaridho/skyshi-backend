import Knex from 'knex'

const DB = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ahmadridhoni'
  }
})

export { DB }
