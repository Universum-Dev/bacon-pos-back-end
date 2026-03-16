import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveCategoryData, updateCategoryData } from '../db/requests.db'

export const ItemsController = {
  createCategory: async (req: Request, res: Response) => {
    console.log('--- CREATE CATEGORY ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await saveCategoryData({ ...decryptedData.categoryData, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createCategory', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateCategory: async (req: Request, res: Response) => {
    console.log('--- UPDATE CATEGORY ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const categoryWmDbId = decryptedData.categoryData.wmDbId
      await updateCategoryData(categoryWmDbId, { ...decryptedData.categoryData, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateCategory', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteCategory: async (req: Request, res: Response) => {
    console.log('--- DELETE CATEGORY ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const categoryWmDbId = decryptedData.categoryData.wmDbId
      await updateCategoryData(categoryWmDbId, { deleted: true })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateCategory', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
