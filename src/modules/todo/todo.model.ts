import { Model } from 'objection'
import { DB } from '../../helpers/db'
import { Activity } from '../activities/activity.model'

Model.knex(DB)

export class Todo extends Model {
  static get tableName() {
    return 'todos'
  }
  static get idColumn() {
    return 'id'
  }
  static get relationMappings() {
    return {
      activity_group: {
        relation: Activity.HasOneRelation,
        modelClass: Activity,
        join: {
          from: 'todos.activity_group_id',
          to: 'activities.id'
        }
      }
    }
  }
}
