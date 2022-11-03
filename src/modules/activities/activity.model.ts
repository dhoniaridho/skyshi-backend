import { Model } from 'objection'
import { DB } from '../../helpers/db'

Model.knex(DB)

export class Activity extends Model {
  static get tableName() {
    return 'activities'
  }
  static get idColumn() {
    return 'id'
  }
}
