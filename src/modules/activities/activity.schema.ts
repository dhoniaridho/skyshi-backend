import Joi from 'joi'

export const schema = Joi.object({
  email: Joi.string().required().email(),
  title: Joi.string().required()
})
