import { DateTime } from 'luxon'
import { Todo } from './todo.model'

export class TodoRepository {
  async getAll(query: number | null) {
    const todos = Todo.query()
      .withGraphFetched('activity_group')
      .whereNull('deleted_at')

    if (!query) return await todos

    return await todos.where({
      activity_group_id: query
    })
  }

  async createOne(todo: Todo) {
    const data = await Todo.query().insert(todo)
    return data
  }

  async getOne(id: number) {
    const data = await Todo.query().findById(id).whereNull('deleted_at')
    return data
  }

  async deleteOne(id: number) {
    const update = Todo.query().whereNull('deleted_at').updateAndFetchById(id, {
      deleted_at: DateTime.now().toJSDate()
    })
    return update
  }

  async updateOne(id: number, payload: Todo) {
    const update = await Todo.query()
      .whereNull('deleted_at')
      .updateAndFetchById(id, payload)
    return update
  }
}
