import Joi from 'joi'

export const schema = Joi.object({
  email: Joi.required().label('email cannot be null'),
  title: Joi.required().label('title cannot be null')
})

export const updateSchema = Joi.object({
  email: Joi.string().email(),
  title: Joi.string()
})
