import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveCategoryData, saveModeSetData, saveAddOnSetData, updateCategoryData, updateModeSetData, updateAddOnSetData, saveItemData, updateItemData } from '../db/requests.db'

export const ItemsController = {
  createItem: async (req: Request, res: Response) => {
    console.log('--- CREATE ITEM ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const itemCreated = await saveItemData({ ...decryptedData.itemData, UMerchantNumber: decryptedData.UMerchantNumber })
      req.io?.emit('item_updated', { item: itemCreated, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const itemUpdated = await updateItemData(itemWmDbId, { ...decryptedData.itemData, updatedAt: new Date() })
      req.io?.emit('item_updated', { item: itemUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const itemDeleted = await updateItemData(itemWmDbId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('item_updated', { item: itemDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const addOnSetCreated = await saveAddOnSetData({ ...decryptedData.addOnSetData, UMerchantNumber: decryptedData.UMerchantNumber })
      req.io?.emit('add_on_set_updated', { addOnSet: addOnSetCreated, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const addOnSetUpdated = await updateAddOnSetData(addOnSetWmDbId, { ...decryptedData.addOnSetData, updatedAt: new Date() })
      req.io?.emit('add_on_set_updated', { addOnSet: addOnSetUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const addOnSetDeleted = await updateAddOnSetData(addOnSetWmDbId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('add_on_set_updated', { addOnSet: addOnSetDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const modeSetCreated = await saveModeSetData({ ...decryptedData.modeSetData, UMerchantNumber: decryptedData.UMerchantNumber })
      req.io?.emit('mode_set_updated', { modeSet: modeSetCreated, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const modeSetUpdated = await updateModeSetData(modeSetWmDbId, { ...decryptedData.modeSetData, updatedAt: new Date() })
      req.io?.emit('mode_set_updated', { modeSet: modeSetUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const modeSetDeleted = await updateModeSetData(modeSetWmDbId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('mode_set_updated', { modeSet: modeSetDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const categoryCreated = await saveCategoryData({ ...decryptedData.categoryData, UMerchantNumber: decryptedData.UMerchantNumber })
      req.io?.emit('category_updated', { category: categoryCreated, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const categoryUpdated = await updateCategoryData(categoryWmDbId, { ...decryptedData.categoryData, updatedAt: new Date() })
      req.io?.emit('category_updated', { category: categoryUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

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
      const categoryDeleted = await updateCategoryData(categoryWmDbId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('category_updated', { category: categoryDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteCategory', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
