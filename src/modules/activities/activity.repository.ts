import { Activity } from './activity.model'
import { DateTime } from 'luxon'

export class ActivityRepository {
  async getAll() {
    const data = await Activity.query().whereNull('deleted_at')
    return data
  }
  async getOne(id: number) {
    const data = await Activity.query()
      .whereNull('deleted_at')
      .where('id', id)
      .first()
    return data
  }
  async deleteOne(id: number) {
    const data = await Activity.query()
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
  async createOne(activity: Activity) {
    const data = await Activity.query().insert(activity)
    return data
  }
}
