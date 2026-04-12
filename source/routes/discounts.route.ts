import { Router } from 'express'

import { DiscountsController } from '../controllers/discounts.controller'

const discountsRoute = Router()

discountsRoute.post('/create-discount', DiscountsController.createDiscount)
discountsRoute.post('/update-discount', DiscountsController.updateDiscount)
discountsRoute.post('/delete-discount', DiscountsController.deleteDiscount)

export default discountsRoute
