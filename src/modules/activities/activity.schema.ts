import Joi from 'joi'
import Ajv, { type JSONSchemaType } from 'ajv'
import ajvError from 'ajv-errors'
import addFormats from 'ajv-formats'

const ajv = new Ajv({ allErrors: true })
ajvError(ajv)
addFormats(ajv, {
  formats: ['email']
})

export type CreateUser = {
  email: string
  title: string
}

const schema: JSONSchemaType<CreateUser> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    email: { type: 'string', format: 'email', errorMessage: 'email must be valid email address' }
  },
  required: ['title', 'email'],
  additionalProperties: false,
  errorMessage: {
    required: {
      title: 'title cannot be null',
      email: 'email cannot be null'
    }
  }
}

export const validate = ajv.compile(schema)

export const updateSchema = Joi.object({
  email: Joi.string().email(),
  title: Joi.string()
})
