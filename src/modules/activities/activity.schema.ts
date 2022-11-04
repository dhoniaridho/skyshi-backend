import Joi from 'joi'

export const schema = Joi.object({
  email: Joi.string().required().email(),
  title: Joi.string().required()
})
export const updateSchema = Joi.object({
  email: Joi.string().email(),
  title: Joi.string()
})
