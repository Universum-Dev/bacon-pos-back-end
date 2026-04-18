import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { savePromoCodeData, updatePromoCodeData } from '../db/requests.db'

export const PromoCodesController = {
  createPromoCode: async (req: Request, res: Response) => {
    console.log('--- CREATE PROMOCODE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const promoCodeCreated = await savePromoCodeData({ ...decryptedData.promoCodeData, UMerchantNumber: decryptedData.UMerchantNumber })
      req.io?.emit('promo_code_updated', { promoCode: promoCodeCreated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createPromoCode', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updatePromoCode: async (req: Request, res: Response) => {
    console.log('--- UPDATE PROMOCODE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const promoCodeId = decryptedData.promoCodeData.wmDbId
      const promoCodeUpdated = await updatePromoCodeData(promoCodeId, { ...decryptedData.promoCodeData, updatedAt: new Date() })
      req.io?.emit('promo_code_updated', { promoCode: promoCodeUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updatePromoCode', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deletePromoCode: async (req: Request, res: Response) => {
    console.log('--- DELETE PROMOCODE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const promoCodeId = decryptedData.promoCodeData.wmDbId
      const promoCodeDeleted = await updatePromoCodeData(promoCodeId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('promo_code_updated', { promoCode: promoCodeDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deletePromoCode', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
