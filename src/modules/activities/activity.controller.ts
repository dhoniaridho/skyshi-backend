import { ActivityRepository } from './activity.repository'
import { Request, Response } from 'express'
import { response } from '../../helpers/response'
import { schema } from './activity.schema'
import { mapError } from '../../helpers/validation'

export class ActivityController {
  private activity = new ActivityRepository()

  constructor() {
    this.activity = new ActivityRepository()
  }

  async getAll(req: Request, res: Response) {
    const activities = await new ActivityRepository().getAll()
    return response(req, res).json(activities, 'Success')
  }
  async create(req: Request, res: Response) {
    // Repository
    const activity = new ActivityRepository()

    const { error, value } = schema.validate(req.body, { abortEarly: false })

    if (!value.title)
      return response(req, res).json(
        null,
        'Bad Request',
        'title cannot be null',
        400
      )
    if (!value.email)
      return response(req, res).json(
        null,
        'Bad Request',
        'email cannot be null',
        400
      )

    // validate any errors
    if (error) {
      return response(req, res).json(
        mapError(error.message),
        'Bad Request',
        'Bad Request',
        400
      )
    }

    const data = await activity.createOne(value)
    const createdData = await activity.getOne(data.$id())

    return response(req, res).json(createdData, 'Success', 'Success', 201)
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
        `Activity with ID ${+req.params.id} Not Found`
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
}
