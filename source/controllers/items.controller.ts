import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveCategoryData, saveModeSetData, saveAddOnSetData, updateCategoryData, updateModeSetData, updateAddOnSetData, saveItemData, updateItemData } from '../db/requests.db'

export const ItemsController = {
  createItem: async (req: Request, res: Response) => {
    console.log('--- CREATE ITEM ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await saveItemData({ ...decryptedData.itemData, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createItem', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateItem: async (req: Request, res: Response) => {
    console.log('--- UPDATE ITEM ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const itemWmDbId = decryptedData.itemData.wmDbId
      await updateItemData(itemWmDbId, { ...decryptedData.itemData, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateItem', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteItem: async (req: Request, res: Response) => {
    console.log('--- DELETE ITEM ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const itemWmDbId = decryptedData.itemData.wmDbId
      await updateItemData(itemWmDbId, { deleted: true, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteItem', error)
      return res.status(500).send({ success: false, error })
    }
  },
  createAddOnSet: async (req: Request, res: Response) => {
    console.log('--- CREATE ADD ON SET ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await saveAddOnSetData({ ...decryptedData.addOnSetData, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createAddOnSet', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateAddOnSet: async (req: Request, res: Response) => {
    console.log('--- UPDATE ADD ON SET ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const addOnSetWmDbId = decryptedData.addOnSetData.wmDbId
      await updateAddOnSetData(addOnSetWmDbId, { ...decryptedData.addOnSetData, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateAddOnSet', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteAddOnSet: async (req: Request, res: Response) => {
    console.log('--- DELETE ADD ON SET ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const addOnSetWmDbId = decryptedData.addOnSetData.wmDbId
      await updateAddOnSetData(addOnSetWmDbId, { deleted: true, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteAddOnSet', error)
      return res.status(500).send({ success: false, error })
    }
  },
  createModeSet: async (req: Request, res: Response) => {
    console.log('--- CREATE MODE SET ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await saveModeSetData({ ...decryptedData.modeSetData, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createModeSet', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateModeSet: async (req: Request, res: Response) => {
    console.log('--- UPDATE MODE SET ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const modeSetWmDbId = decryptedData.modeSetData.wmDbId
      await updateModeSetData(modeSetWmDbId, { ...decryptedData.modeSetData, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateModeSet', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteModeSet: async (req: Request, res: Response) => {
    console.log('--- DELETE MODE SET ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const modeSetWmDbId = decryptedData.modeSetData.wmDbId
      await updateModeSetData(modeSetWmDbId, { deleted: true, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteModeSet', error)
      return res.status(500).send({ success: false, error })
    }
  },
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
      await updateCategoryData(categoryWmDbId, { deleted: true, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteCategory', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
