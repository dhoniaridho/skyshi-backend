"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const objection_1 = require("objection");
const db_1 = require("../../helpers/db");
objection_1.Model.knex(db_1.DB);
class Activity extends objection_1.Model {
    static get tableName() {
        return 'activities';
    }
    static get idColumn() {
        return 'id';
    }
}
exports.Activity = Activity;
