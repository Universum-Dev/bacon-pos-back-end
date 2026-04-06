import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils/encryption.utils'
import { getPaymentData, saveOrderData, savePaymentData, updateOrderData, getOrderDataToSend } from '../db/requests.db'

export const OrdersController = {
  sendCreatedOrder: async (req: Request, res: Response) => {
    console.log('--- SEND CREATED ORDER ---')
    const { wmDbId } = req.body

    try {
      const orderToSend = await getOrderDataToSend(wmDbId)

      req.io?.emit('order_updated', { order: orderToSend })
      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error sendCreatedOrder', error)
      return res.status(500).send({ success: false, error })
    }
  },
  createOrder: async (req: Request, res: Response) => {
    console.log('--- CREATE ORDER ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { orderData, UMerchantNumber } = decryptedData

      const orderDataCreated = await saveOrderData({ ...orderData, UMerchantNumber })
      req.io?.emit('order_updated', { order: orderDataCreated, UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createOrder', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateOrder: async (req: Request, res: Response) => {
    console.log('--- UPDATE ORDER ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { orderData, UMerchantNumber } = decryptedData

      const orderDataUpdated = await updateOrderData(orderData.wmDbId, { ...orderData })
      req.io?.emit('order_updated', { order: orderDataUpdated, UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateOrder', error)
      return res.status(500).send({ success: false, error })
    }
  },
  sendCreatedPayment: async (req: Request, res: Response) => {
    console.log('--- SEND CREATED PAYMENT ---')
    const { wmDbId, paymentWmDbId } = req.body

    try {
      const orderDataUpdated = await updateOrderData(wmDbId, { status: 'PAID', paymentMethod: 'cash' })
      const paymentToSend = await getPaymentData({ deleted: false, wmDbId: paymentWmDbId })

      req.io?.emit('order_updated', { order: orderDataUpdated })
      setTimeout(() => {
        req.io?.emit('payment_updated', { payment: paymentToSend })
      }, 1000)
      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error sendCreatedPayment', error)
      return res.status(500).send({ success: false, error })
    }
  },
  createPayment: async (req: Request, res: Response) => {
    console.log('--- CREATE PAYMENT ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { paymentData, UMerchantNumber } = decryptedData

      await savePaymentData({ ...paymentData, UMerchantNumber })
      req.io?.emit('payment_updated', { payment: paymentData, UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createPayment', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
