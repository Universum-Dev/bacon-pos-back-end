import { Router } from 'express'

import { DiningOptionsController } from '../controllers/diningoptions.controller'

const diningOptionsRoute = Router()

diningOptionsRoute.post('/create-dining-option', DiningOptionsController.createDiningOption)
diningOptionsRoute.post('/update-dining-option', DiningOptionsController.updateDiningOption)
diningOptionsRoute.post('/delete-dining-option', DiningOptionsController.deleteDiningOption)

export default diningOptionsRoute
