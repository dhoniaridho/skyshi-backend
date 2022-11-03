"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('activities', (table) => {
        table.increments('id');
        table.string('email').notNullable();
        table.string('title').notNullable();
        table.timestamps(true, true);
        table.datetime('deleted_at');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('activities');
}
exports.down = down;
