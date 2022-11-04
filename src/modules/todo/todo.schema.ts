import { ActivityRepository } from '../activities/activity.repository'
import Joi from 'joi'

export const schema = Joi.object({
  activity_group_id: Joi.number()
    .required()
    .external(async (value) => {
      const activity = await new ActivityRepository().getOne(value)
      if (!activity) throw new Error('Invalid activity group id')
    }),
  title: [Joi.required().label('title cannot be null')],
  priority: Joi.string().allow(null).default('very-high'),
  is_active: Joi.boolean().allow(null).default(true)
})

export const schemaUpdate = Joi.object({
  title: Joi.string(),
  priority: Joi.string().allow(null),
  is_active: Joi.boolean().allow(null)
})
