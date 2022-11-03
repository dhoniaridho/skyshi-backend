import { DateTime } from 'luxon'
import { Todo } from './todo.model'

export class TodoRepository {
  async getAll(query: number | null) {
    const todos = Todo.query()
      .withGraphFetched('activity_group')
      .havingNull('deleted_at')

    if (!query) return await todos

    return await todos.where({
      activity_group_id: query
    })
  }

  async createOne(todo: Todo) {
    const data = await Todo.query().insert(todo)
    const createdData = await Todo.query()
      .findById(data.$id())
      .havingNull('deleted_at')
    return createdData
  }

  async getOne(id: number) {
    const data = await Todo.query().findById(id).havingNull('deleted_at')
    return data
  }

  async deleteOne(id: number) {
    const data = await Todo.query().findById(id).havingNull('deleted_at')
    if (!data) return null

    const update = await Todo.query().updateAndFetchById(id, {
      deleted_at: DateTime.now().toJSDate()
    })
    return update
  }

  async updateOne(id: number, payload: Todo) {
    const data = await Todo.query().findById(id).havingNull('deleted_at')
    if (!data) return null
    const update = await Todo.query().updateAndFetchById(id, payload)
    return update
  }
}
