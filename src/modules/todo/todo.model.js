"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const objection_1 = require("objection");
const db_1 = require("../../helpers/db");
const activity_model_1 = require("../activities/activity.model");
objection_1.Model.knex(db_1.DB);
class Todo extends objection_1.Model {
    static get tableName() {
        return 'todos';
    }
    static get idColumn() {
        return 'id';
    }
    static get relationMappings() {
        return {
            activity_group: {
                relation: activity_model_1.Activity.HasOneRelation,
                modelClass: activity_model_1.Activity,
                join: {
                    from: 'todos.activity_group_id',
                    to: 'activities.id'
                }
            }
        };
    }
}
exports.Todo = Todo;
