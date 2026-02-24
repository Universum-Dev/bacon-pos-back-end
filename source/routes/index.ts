import { Router, Request, Response } from 'express'

import syncRoute from './sync.route'

const appRouter = Router()

appRouter.get('/health-check', (req: Request, res: Response) => res.send('Bacon POS local Back End is working'))
appRouter.use('/sync', syncRoute)

export default appRouter
