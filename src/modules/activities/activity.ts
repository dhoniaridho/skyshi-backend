import { Router } from 'express'
import { ActivityController } from './activity.controller'

const router = Router()

const { getAll, create, getOne, deleteOne } = new ActivityController()

router.get('/activity-groups', getAll)
router.post('/activity-groups', create)
router.get('/activity-groups/:id', getOne)
router.delete('/activity-groups/:id', deleteOne)

export { router as ActivitiesRouter }
