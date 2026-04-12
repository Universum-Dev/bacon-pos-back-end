import { Router } from 'express'

import { TaxesController } from '../controllers/taxes.controller'

const taxesRoute = Router()

taxesRoute.post('/create-tax', TaxesController.createTax)
taxesRoute.post('/update-tax', TaxesController.updateTax)
taxesRoute.post('/delete-tax', TaxesController.deleteTax)

export default taxesRoute
