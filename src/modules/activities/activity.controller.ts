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
    return response(req, res).json(activities)
  }
  async create(req: Request, res: Response) {
    // Repository
    const activity = new ActivityRepository()

    const { error, value } = schema.validate(req.body, { abortEarly: false })

    // validate any errors
    if (error) {
      return response(req, res).json(
        mapError(error.message),
        400,
        'Data Gagal Divalidasi'
      )
    }

    const data = await activity.createOne(value)
    const createdData = await activity.getOne(data.$id())

    return response(req, res).json(createdData, 201)
  }

  async getOne(req: Request, res: Response) {
    // Repository
    const activity = new ActivityRepository()
    const data = await activity.getOne(+req.params.id)

    // Handle 404
    if (!data)
      return response(req, res).json(
        null,
        404,
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
        404,
        `Activity with ID ${+req.params.id} Not Found`
      )
    return response(req, res).json(null, 200, 'Data berhasil dihapus')
  }
}
