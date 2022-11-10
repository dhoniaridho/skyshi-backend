import { ActivityRepository } from './activity.repository'
import { Request, Response } from 'express'
import { response } from '../../helpers/response'
import { validate, updateSchema } from './activity.schema'
import { mapError } from '../../helpers/validation'
import { DateTime } from 'luxon'

export class ActivityController {
  async getAll(req: Request, res: Response) {
    const activities = await new ActivityRepository().getAll()
    return response(req, res).json(activities, 'Success')
  }
  async create(req: Request, res: Response) {
    // validate any errors
    if (!validate(req.body)) {
      if (validate.errors) {
        return response(req, res).json(
          {},
          'Bad Request',
          validate.errors[0].message,
          400
        )
      }
    }

    const { email, title } = req.body

    const data = await new ActivityRepository().createOne({
      email,
      title
    })

    return response(req, res).json(
      {
        ...data,
        created_at: DateTime.now().toISO(),
        updated_at: DateTime.now().toISO()
      },
      'Success',
      'Success',
      201
    )
  }

  async getOne(req: Request, res: Response) {
    // Repository
    const activity = new ActivityRepository()
    const data = await activity.getOne(+req.params.id)

    // Handle 404
    if (!data)
      return response(req, res).json(
        null,
        'Not Found',
        `Activity with ID ${+req.params.id} Not Found`,
        404
      )
    return response(req, res).json(data)
  }

  async deleteOne(req: Request, res: Response) {
    // Repository
    const activity = new ActivityRepository()
    const data = await activity.deleteOne(+req.params.id)

    // Handle 404
    if (!data)
      return response(req, res).json(
        null,
        'Not Found',
        `Activity with ID ${+req.params.id} Not Found`,
        404
      )
    return response(req, res).json({}, 'Success', 'Success')
  }

  async updateOne(req: Request, res: Response) {
    // Repository
    const activity = new ActivityRepository()
    const { error, value } = updateSchema.validate(req.body, {
      abortEarly: false
    })
    const data = await activity.updateOne(+req.params.id, value)
    // Handle 404
    if (!data)
      return response(req, res).json(
        {},
        'Not Found',
        `Activity with ID ${+req.params.id} Not Found`,
        404
      )

    // validate any errors
    if (error) {
      return response(req, res).json({}, 'Bad Request', 'Bad Request', 400)
    }

    return response(req, res).json(data, 'Success', 'Success')
  }
}
