import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveDiscountData, updateDiscountData } from '../db/requests.db'

export const DiscountsController = {
  createDiscount: async (req: Request, res: Response) => {
    console.log('--- CREATE DISCOUNT ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const discountCreated = await saveDiscountData({ ...decryptedData.discountData, UMerchantNumber: decryptedData.UMerchantNumber })
      req.io?.emit('discount_updated', { discount: discountCreated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createDiscount', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateDiscount: async (req: Request, res: Response) => {
    console.log('--- UPDATE DISCOUNT ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const discountId = decryptedData.discountData.wmDbId
      const discountUpdated = await updateDiscountData(discountId, { ...decryptedData.discountData, updatedAt: new Date() })
      req.io?.emit('discount_updated', { discount: discountUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateDiscount', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteDiscount: async (req: Request, res: Response) => {
    console.log('--- DELETE DISCOUNT ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const discountId = decryptedData.discountData.wmDbId
      const discountDeleted = await updateDiscountData(discountId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('discount_updated', { discount: discountDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteDiscount', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
