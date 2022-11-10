import Joi from 'joi'
import Ajv, { type JSONSchemaType } from 'ajv'
import ajvError from 'ajv-errors'

const ajv = ajvError(new Ajv({ allErrors: true }))

type Schema = {
  title: string
  priority?: string
  is_active?: boolean
  activity_group_id: number
}

export const schema: JSONSchemaType<Schema> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    is_active: { type: 'boolean', default: true, nullable: true },
    priority: { type: 'string', default: 'very-high', nullable: true },
    activity_group_id: { type: 'integer' }
  },
  required: ['title', 'activity_group_id'],
  additionalProperties: false,
  errorMessage: {
    required: {
      title: 'title cannot be null',
      activity_group_id: 'activity_group_id cannot be null'
    }
  }
}

export const validate = ajv.compile(schema)

export const schemaUpdate = Joi.object({
  title: Joi.string(),
  priority: Joi.string().allow(null),
  is_active: Joi.boolean().allow(null)
})
