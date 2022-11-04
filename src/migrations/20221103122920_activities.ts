import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('activities', (table) => {
    table.increments('id')
    table.string('email').notNullable()
    table.string('title').notNullable()
    table.timestamps(true, true)
    table.datetime('deleted_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('activities')
}
