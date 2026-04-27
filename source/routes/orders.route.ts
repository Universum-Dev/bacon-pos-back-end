import { Router } from 'express'

import { OrdersController } from '../controllers/orders.controller'

const ordersRoute = Router()

ordersRoute.post('/create-order', OrdersController.createOrder)
ordersRoute.post('/update-order', OrdersController.updateOrder)
ordersRoute.post('/delete-order', OrdersController.deleteOrder)
ordersRoute.post('/create-payment', OrdersController.createPayment)
ordersRoute.post('/send-created-order', OrdersController.sendCreatedOrder)
ordersRoute.post('/send-created-payment', OrdersController.sendCreatedPayment)

export default ordersRoute
