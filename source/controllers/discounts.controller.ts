import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveDiscountData, updateDiscountData } from '../db/requests.db'

export const DiscountsController = {
  createDiscount: async (req: Request, res: Response) => {
    console.log('--- CREATE DISCOUNT ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await saveDiscountData({ ...decryptedData.discountData, UMerchantNumber: decryptedData.UMerchantNumber })

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
      await updateDiscountData(discountId, { ...decryptedData.discountData, updatedAt: new Date() })

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
      await updateDiscountData(discountId, { deleted: true, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteDiscount', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
