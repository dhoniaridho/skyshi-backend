"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const response_1 = require("../../helpers/response");
const validation_1 = require("../../helpers/validation");
const todo_repository_1 = require("./todo.repository");
const todo_schema_1 = require("./todo.schema");
class TodoController {
    async getAll(req, res, next) {
        const todoRepository = new todo_repository_1.TodoRepository();
        const query = req?.query?.activity_group_id;
        const data = await todoRepository.getAll(query ? +query : null);
        return (0, response_1.response)(req, res).json(data);
    }
    async createOne(req, res) {
        const todoRepository = new todo_repository_1.TodoRepository();
        try {
            const value = await todo_schema_1.schema.validateAsync(req.body);
            const data = await todoRepository.createOne(value);
            return (0, response_1.response)(req, res).json(data, 201);
        }
        catch (error) {
            if (error) {
                return (0, response_1.response)(req, res).json((0, validation_1.mapError)(error.message), 400, 'You provided invalid data');
            }
        }
    }
    async update(req, res) {
        const todoRepository = new todo_repository_1.TodoRepository();
        const { value, error } = todo_schema_1.schemaUpdate.validate(req.body);
        // validate any errors
        if (error) {
            return (0, response_1.response)(req, res).json((0, validation_1.mapError)(error.message), 400, 'Validation failed');
        }
        const data = await todoRepository.updateOne(+req.params.id, value);
        // Handle 404
        if (!data)
            return (0, response_1.response)(req, res).json(null, 404, `Activity with ID ${+req.params.id} Not Found`);
        return (0, response_1.response)(req, res).json(data, 200);
    }
    async getOne(req, res) {
        const todoRepository = new todo_repository_1.TodoRepository();
        const data = await todoRepository.getOne(+req.params.id);
        // Handle 404
        if (!data)
            return (0, response_1.response)(req, res).json(null, 404, `Activity with ID ${+req.params.id} Not Found`);
        return (0, response_1.response)(req, res).json(data, 200);
    }
    async deleteOne(req, res) {
        const todoRepository = new todo_repository_1.TodoRepository();
        const data = await todoRepository.deleteOne(+req.params.id);
        // Handle 404
        if (!data) {
            return (0, response_1.response)(req, res).json(null, 404, `Activity with ID ${+req.params.id} Not Found`);
        }
        return (0, response_1.response)(req, res).json(null, 200, `Data with id  ${+req.params.id} was deleted`);
    }
}
exports.TodoController = TodoController;
