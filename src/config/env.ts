import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export const Config = {
  DB: {
    client: process.env.DB_CONNECTION ?? 'mysql',
    connection: {
      host: process.env.MYSQL_HOST ?? '127.0.0.1',
      port: +(process.env.MYSQL_PORT ?? '3306'),
      database: process.env.MYSQL_DBNAME ?? 'ahmadridhoni',
      user: process.env.MYSQL_USER ?? 'root',
      password: process.env.MYSQL_PASSWORD ?? 'root'
    }
  }
}
