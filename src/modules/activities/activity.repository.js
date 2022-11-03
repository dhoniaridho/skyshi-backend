"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRepository = void 0;
const activity_model_1 = require("./activity.model");
const luxon_1 = require("luxon");
class ActivityRepository {
    async getAll() {
        const data = await activity_model_1.Activity.query().havingNull('deleted_at');
        return data;
    }
    async getOne(id) {
        const data = await activity_model_1.Activity.query()
            .havingNull('deleted_at')
            .where('id', id)
            .first();
        return data;
    }
    async deleteOne(id) {
        const data = await activity_model_1.Activity.query()
            .updateAndFetchById(id, {
            deleted_at: luxon_1.DateTime.now().toJSDate()
        })
            .first();
        return data;
    }
    async createOne(activity) {
        const data = await activity_model_1.Activity.query().insert(activity);
        return data;
    }
}
exports.ActivityRepository = ActivityRepository;
