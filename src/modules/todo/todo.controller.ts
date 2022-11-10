import type { NextFunction, Request, Response } from 'express'
import { response } from '../../helpers/response'
import { mapError } from '../../helpers/validation'
import { TodoRepository } from './todo.repository'
import { schemaUpdate, validate } from './todo.schema'

export class TodoController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const todoRepository = new TodoRepository()
    const query = req?.query?.activity_group_id
    const data = await todoRepository.getAll(query ? +query : null)
    return response(req, res).json(data)
  }

  async createOne(req: Request, res: Response) {
    const todoRepository = new TodoRepository()

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

    const { activity_group_id, is_active, priority, title } = req.body

    try {
      const data: any = await todoRepository.createOne({
        activity_group_id,
        title,
        is_active: is_active ?? true,
        priority: priority ?? ' very-high'
      })
      return response(req, res).json(
        {
          ...data,
          is_active: Boolean(data?.is_active ?? 1)
        },
        'Success',
        'Success',
        201
      )
    } catch (error: any) {
      if (error) {
        return response(req, res).json(
          {},
          'Bad Request',
          mapError(error.message)[0],
          400
        )
      }
    }
  }
  async update(req: Request, res: Response) {
    const todoRepository = new TodoRepository()
    const { value, error } = schemaUpdate.validate(req.body)

    // validate any errors
    if (error) {
      return response(req, res).json(
        mapError(error.message),
        'Bad Request',
        'Bad Request',
        400
      )
    }

    const update = await todoRepository.updateOne(+req.params.id, value)

    // Handle 404
    if (!update)
      return response(req, res).json(
        {},
        'Not Found',
        `Todo with ID ${+req.params.id} Not Found`,
        404
      )

    return response(req, res).json(update, 'Success')
  }

  async getOne(req: Request, res: Response) {
    const todoRepository = new TodoRepository()
    const data = await todoRepository.getOne(+req.params.id)

    // Handle 404
    if (!data)
      return response(req, res).json(
        {},
        'Not Found',
        `Todo with ID ${+req.params.id} Not Found`,
        404
      )

    return response(req, res).json(data)
  }

  async deleteOne(req: Request, res: Response) {
    const todoRepository = new TodoRepository()
    const data = await todoRepository.deleteOne(+req.params.id)

    // Handle 404
    if (!data) {
      return response(req, res).json(
        {},
        'Not Found',
        `Todo with ID ${+req.params.id} Not Found`,
        404
      )
    }

    return response(req, res).json(
      {},
      'Success',
      `Data with id ID ${+req.params.id} was deleted`
    )
  }
}
