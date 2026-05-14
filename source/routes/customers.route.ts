import { Router } from 'express'

import { CustomersController } from '../controllers/customers.controller'

const customersRoute = Router()

customersRoute.post('/create-customer', CustomersController.createCustomer)
customersRoute.post('/update-customer', CustomersController.updateCustomer)
customersRoute.post('/delete-customer', CustomersController.deleteCustomer)

export default customersRoute
