"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const luxon_1 = require("luxon");
const todo_model_1 = require("./todo.model");
class TodoRepository {
    async getAll(query) {
        const todos = todo_model_1.Todo.query()
            .withGraphFetched('activity_group')
            .havingNull('deleted_at');
        if (!query)
            return await todos;
        return await todos.where({
            activity_group_id: query
        });
    }
    async createOne(todo) {
        const data = await todo_model_1.Todo.query().insert(todo);
        const createdData = await todo_model_1.Todo.query()
            .findById(data.$id())
            .havingNull('deleted_at');
        return createdData;
    }
    async getOne(id) {
        const data = await todo_model_1.Todo.query().findById(id).havingNull('deleted_at');
        return data;
    }
    async deleteOne(id) {
        const data = await todo_model_1.Todo.query().findById(id).havingNull('deleted_at');
        if (!data)
            return null;
        const update = await todo_model_1.Todo.query().updateAndFetchById(id, {
            deleted_at: luxon_1.DateTime.now().toJSDate()
        });
        return update;
    }
    async updateOne(id, payload) {
        const data = await todo_model_1.Todo.query().findById(id).havingNull('deleted_at');
        if (!data)
            return null;
        const update = await todo_model_1.Todo.query().updateAndFetchById(id, payload);
        return update;
    }
}
exports.TodoRepository = TodoRepository;
