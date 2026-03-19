import { Router } from 'express'

import { ItemsController } from '../controllers/items.controller'

const itemsRoute = Router()

itemsRoute.post('/create-item', ItemsController.createItem)
itemsRoute.post('/update-item', ItemsController.updateItem)
itemsRoute.post('/delete-item', ItemsController.deleteItem)
itemsRoute.post('/create-mode-set', ItemsController.createModeSet)
itemsRoute.post('/update-mode-set', ItemsController.updateModeSet)
itemsRoute.post('/delete-mode-set', ItemsController.deleteModeSet)
itemsRoute.post('/create-category', ItemsController.createCategory)
itemsRoute.post('/update-category', ItemsController.updateCategory)
itemsRoute.post('/delete-category', ItemsController.deleteCategory)
itemsRoute.post('/create-add-on-set', ItemsController.createAddOnSet)
itemsRoute.post('/update-add-on-set', ItemsController.updateAddOnSet)
itemsRoute.post('/delete-add-on-set', ItemsController.deleteAddOnSet)

export default itemsRoute
