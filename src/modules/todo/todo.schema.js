"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUpdate = exports.schema = void 0;
const activity_repository_1 = require("../activities/activity.repository");
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object({
    activity_group_id: joi_1.default.number()
        .required()
        .external(async (value) => {
        const activity = await new activity_repository_1.ActivityRepository().getOne(value);
        if (!activity)
            throw new Error('Invalid activity group id');
    }),
    title: joi_1.default.string().required(),
    priority: joi_1.default.string().allow(null),
    is_active: joi_1.default.boolean().allow(null)
});
exports.schemaUpdate = joi_1.default.object({
    title: joi_1.default.string(),
    priority: joi_1.default.string().allow(null),
    is_active: joi_1.default.boolean().allow(null)
});
