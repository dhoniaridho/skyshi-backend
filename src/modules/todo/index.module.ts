import { Router } from 'express'
import { TodoController } from './todo.controller'

const router = Router()

const { getAll, createOne, getOne, deleteOne, update } = new TodoController()

router.get('/todo-items', getAll)
router.post('/todo-items', createOne)
router.get('/todo-items/:id', getOne)
router.delete('/todo-items/:id', deleteOne)
router.patch('/todo-items/:id', update)

export { router as TodoModule }
