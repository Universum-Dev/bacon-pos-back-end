import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveTaxData, updateTaxData } from '../db/requests.db'

export const TaxesController = {
  createTax: async (req: Request, res: Response) => {
    console.log('--- CREATE TAX ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await saveTaxData({ ...decryptedData.taxData, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createTax', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateTax: async (req: Request, res: Response) => {
    console.log('--- UPDATE TAX ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const taxId = decryptedData.taxData.wmDbId
      await updateTaxData(taxId, { ...decryptedData.taxData, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateTax', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteTax: async (req: Request, res: Response) => {
    console.log('--- DELETE TAX ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const taxId = decryptedData.taxData.wmDbId
      await updateTaxData(taxId, { deleted: true, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteTax', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
