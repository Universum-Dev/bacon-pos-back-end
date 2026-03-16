import { Router } from 'express'

import { PrepStationsController } from '../controllers/prepstations.controller'

const prepStationsRoute = Router()

prepStationsRoute.post('/create', PrepStationsController.createPrepStation)
prepStationsRoute.post('/update', PrepStationsController.updatePrepStation)
prepStationsRoute.post('/delete', PrepStationsController.deletePrepStation)

export default prepStationsRoute
