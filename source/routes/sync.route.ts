import { Router } from 'express'

import { SyncController } from '../controllers/sync.controller'

const syncRoute = Router()

syncRoute.post('/first-sync', SyncController.firstSync)

export default syncRoute
