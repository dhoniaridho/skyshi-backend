"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('todos', (table) => {
        table.increments();
        table.string('title').notNullable();
        table.integer('activity_group_id').unsigned().nullable();
        table.foreign('activity_group_id').references('id').inTable('activities');
        table.boolean('is_active').defaultTo(true);
        table.string('priority').nullable().defaultTo('very-high');
        table.timestamps(true, true);
        table.datetime('deleted_at').nullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('todos');
}
exports.down = down;
