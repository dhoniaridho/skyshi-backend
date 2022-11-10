import { Activity } from './activity.model'
import { DateTime } from 'luxon'

export class ActivityRepository {
  getAll() {
    const data = Activity.query().whereNull('deleted_at').limit(20)
    return data
  }
  getOne(id: number) {
    const data = Activity.query()
      .whereNull('deleted_at')
      .where('id', id)
      .first()
    return data
  }
  deleteOne(id: number) {
    const data = Activity.query()
      .whereNull('deleted_at')
      .updateAndFetchById(id, {
        deleted_at: DateTime.now().toJSDate()
      })
      .first()
    return data
  }
  updateOne(id: number, payload: { email?: string; title?: string }) {
    const data = Activity.query()
      .whereNull('deleted_at')
      .updateAndFetchById(id, payload)
    return data
  }
  createOne(activity: Activity) {
    const data = Activity.query().insert(activity)
    return data
  }
}
