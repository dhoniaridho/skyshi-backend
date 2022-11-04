import { Router } from 'express'
import { ActivityController } from './activity.controller'

const router = Router()

const { getAll, create, getOne, deleteOne, updateOne } =
  new ActivityController()

router.get('/activity-groups', getAll)
router.post('/activity-groups', create)
router.get('/activity-groups/:id', getOne)
router.patch('/activity-groups/:id', updateOne)
router.delete('/activity-groups/:id', deleteOne)

export { router as ActivitiesModule }
