import { DateTime } from 'luxon'
import { Todo } from './todo.model'

export class TodoRepository {
  async getAll(query: number | null) {
    if (query) {
      const todos = Todo.query()
        .withGraphFetched('activity_group')
        .whereNull('deleted_at')
        .limit(10)
      return todos
    }
    return Todo.query()
      .where({
        activity_group_id: query
      })
      .whereNull('deleted_at')
      .limit(10)
  }

  createOne(todo: Todo) {
    const data = Todo.query().insert(todo)
    return data
  }

  getOne(id: number) {
    const data = Todo.query().findById(id).whereNull('deleted_at')
    return data
  }

  deleteOne(id: number) {
    const update = Todo.query().whereNull('deleted_at').updateAndFetchById(id, {
      deleted_at: DateTime.now().toJSDate()
    })
    return update
  }

  updateOne(id: number, payload: Todo) {
    const update = Todo.query()
      .whereNull('deleted_at')
      .updateAndFetchById(id, payload)
    return update
  }
}
