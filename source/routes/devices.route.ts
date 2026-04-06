import { Router } from 'express'

import { DevicesController } from '../controllers/devices.controller'

const devicesRoute = Router()

devicesRoute.post('/configure-pinpad', DevicesController.configurePinpad)
devicesRoute.post('/configure-printer', DevicesController.configurePrinter)

export default devicesRoute
