import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils/encryption.utils'
import { saveDiningOptionData, updateDiningOptionData } from '../db/requests.db'

export const DiningOptionsController = {
  createDiningOption: async (req: Request, res: Response) => {
    console.log('--- CREATE DINING OPTION ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await saveDiningOptionData({
        ...decryptedData.diningOptionData,
        UMerchantNumber: decryptedData.UMerchantNumber
      })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createDiningOption', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateDiningOption: async (req: Request, res: Response) => {
    console.log('--- UPDATE DINING OPTION ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const diningOptionWmDbId = decryptedData.diningOptionData.wmDbId
      await updateDiningOptionData(diningOptionWmDbId, { ...decryptedData.diningOptionData, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateDiningOption', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteDiningOption: async (req: Request, res: Response) => {
    console.log('--- DELETE DINING OPTION ---')

    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const diningOptionWmDbId = decryptedData.diningOptionData.wmDbId
      await updateDiningOptionData(diningOptionWmDbId, { deleted: true, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteDiningOption', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
