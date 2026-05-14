import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveCustomerData, updateCustomerData } from '../db/requests.db'

export const CustomersController = {
  createCustomer: async (req: Request, res: Response) => {
    console.log('--- CREATE CUSTOMER ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const customerCreated = await saveCustomerData({ ...decryptedData.customerData, UMerchantNumber: decryptedData.UMerchantNumber })
      req.io?.emit('customer_updated', { customer: customerCreated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createCustomer', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateCustomer: async (req: Request, res: Response) => {
    console.log('--- UPDATE CUSTOMER ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const customerId = decryptedData.customerData.wmDbId
      const customerUpdated = await updateCustomerData(customerId, { ...decryptedData.customerData, updatedAt: new Date() })
      req.io?.emit('customer_updated', { customer: customerUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateCustomer', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteCustomer: async (req: Request, res: Response) => {
    console.log('--- DELETE CUSTOMER ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const customerId = decryptedData.customerData.wmDbId
      const customerDeleted = await updateCustomerData(customerId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('customer_updated', { customer: customerDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteCustomer', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
