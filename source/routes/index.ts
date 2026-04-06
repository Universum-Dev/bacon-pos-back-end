import { Router, Request, Response } from 'express'

import syncRoute from './sync.route'
import itemsRoute from './items.route'
import ordersRoute from './orders.route'
import accountRoute from './account.route'
import devicesRoute from './devices.route'
import settingsRoute from './settings.route'
import employeesRoute from './employees.route'
import tableMapsRoute from './table-maps.route'
import prepStationsRoute from './prep-stations.route'
import serviceAreasRoute from './service-areas.route'
import diningOptionsRoute from './dining-options.route'

const appRouter = Router()

appRouter.get('/health-check', (req: Request, res: Response) => res.send('Bacon POS local Back End is working'))
appRouter.use('/sync', syncRoute)
appRouter.use('/items', itemsRoute)
appRouter.use('/orders', ordersRoute)
appRouter.use('/account', accountRoute)
appRouter.use('/devices', devicesRoute)
appRouter.use('/settings', settingsRoute)
appRouter.use('/employees', employeesRoute)
appRouter.use('/table-maps', tableMapsRoute)
appRouter.use('/prep-stations', prepStationsRoute)
appRouter.use('/service-areas', serviceAreasRoute)
appRouter.use('/dining-options', diningOptionsRoute)

export default appRouter
