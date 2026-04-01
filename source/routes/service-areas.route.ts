import { Router } from 'express'

import { ServiceAreasController } from '../controllers/serviceareas.controller'

const serviceAreasRoute = Router()

serviceAreasRoute.post('/create-service-area', ServiceAreasController.createServiceArea)
serviceAreasRoute.post('/update-service-area', ServiceAreasController.updateServiceArea)
serviceAreasRoute.post('/delete-service-area', ServiceAreasController.deleteServiceArea)

export default serviceAreasRoute
