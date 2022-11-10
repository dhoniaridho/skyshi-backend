import { DateTime } from 'luxon'
import { Todo } from './todo.model'

interface CreateTodo {
  title: string
  activity_group_id: number
  priority: string
  is_active: boolean
}

export class TodoRepository {
  async getAll(query: number | null) {
    if (!query) {
      const todos = Todo.query().whereNull('deleted_at').limit(10)
      return todos
    }

    return Todo.query()
      .where({
        activity_group_id: query
      })
      .whereNull('deleted_at')
      .limit(10)
  }

  createOne(todo: CreateTodo) {
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
