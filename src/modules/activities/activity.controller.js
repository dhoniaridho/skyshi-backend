"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityController = void 0;
const activity_repository_1 = require("./activity.repository");
const response_1 = require("../../helpers/response");
const activity_schema_1 = require("./activity.schema");
const validation_1 = require("../../helpers/validation");
class ActivityController {
    constructor() {
        this.activity = new activity_repository_1.ActivityRepository();
        this.activity = new activity_repository_1.ActivityRepository();
    }
    async getAll(req, res) {
        const activities = await new activity_repository_1.ActivityRepository().getAll();
        return (0, response_1.response)(req, res).json(activities);
    }
    async create(req, res) {
        // Repository
        const activity = new activity_repository_1.ActivityRepository();
        const { error, value } = activity_schema_1.schema.validate(req.body, { abortEarly: false });
        // validate any errors
        if (error) {
            return (0, response_1.response)(req, res).json((0, validation_1.mapError)(error.message), 400, 'Validation failed');
        }
        const data = await activity.createOne(value);
        const createdData = await activity.getOne(data.$id());
        return (0, response_1.response)(req, res).json(createdData, 201);
    }
    async getOne(req, res) {
        // Repository
        const activity = new activity_repository_1.ActivityRepository();
        const data = await activity.getOne(+req.params.id);
        // Handle 404
        if (!data)
            return (0, response_1.response)(req, res).json(null, 404, `Activity with ID ${+req.params.id} Not Found`);
        return (0, response_1.response)(req, res).json(data);
    }
    async deleteOne(req, res) {
        // Repository
        const activity = new activity_repository_1.ActivityRepository();
        const data = await activity.deleteOne(+req.params.id);
        // Handle 404
        if (!data)
            return (0, response_1.response)(req, res).json(null, 404, `Activity with ID ${+req.params.id} Not Found`);
        return (0, response_1.response)(req, res).json(null, 200, `Data with id  ${req.params.id} was deleted`);
    }
}
exports.ActivityController = ActivityController;
