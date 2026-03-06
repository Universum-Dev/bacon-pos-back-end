import { Router } from 'express'

import { ItemsController } from '../controllers/items.controller'

const itemsRoute = Router()

itemsRoute.post('/create-category', ItemsController.createCategory)
itemsRoute.post('/update-category', ItemsController.updateCategory)
itemsRoute.post('/delete-category', ItemsController.deleteCategory)

export default itemsRoute
