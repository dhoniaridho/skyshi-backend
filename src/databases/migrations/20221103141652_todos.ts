import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('todos', (table) => {
    table.increments()
    table.string('title').notNullable()
    table.integer('activity_group_id').unsigned().nullable()
    table.foreign('activity_group_id').references('id').inTable('activities')
    table.boolean('is_active').defaultTo(true)
    table.string('priority').nullable().defaultTo('very-high')
    table.timestamps(true, true)
    table.datetime('deleted_at').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todos')
}
