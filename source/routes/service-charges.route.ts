import { Router } from 'express'

import { ServiceChargesController } from '../controllers/servicecharges.controller'

const serviceChargesRoute = Router()

serviceChargesRoute.post('/create-service-charge', ServiceChargesController.createServiceCharge)
serviceChargesRoute.post('/update-service-charge', ServiceChargesController.updateServiceCharge)
serviceChargesRoute.post('/delete-service-charge', ServiceChargesController.deleteServiceCharge)

export default serviceChargesRoute
