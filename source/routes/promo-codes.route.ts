import { Router } from 'express'

import { PromoCodesController } from '../controllers/promocodes.controller'

const promoCodesRoute = Router()

promoCodesRoute.post('/create-promo-code', PromoCodesController.createPromoCode)
promoCodesRoute.post('/update-promo-code', PromoCodesController.updatePromoCode)
promoCodesRoute.post('/delete-promo-code', PromoCodesController.deletePromoCode)

export default promoCodesRoute
