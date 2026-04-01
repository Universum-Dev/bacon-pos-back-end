import { Router } from 'express'

import { PrintersController } from '../controllers/printers.controller'

const printersRoute = Router()

printersRoute.post('/configure-printer', PrintersController.configurePrinter)

export default printersRoute
