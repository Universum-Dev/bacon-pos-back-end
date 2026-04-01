import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils/encryption.utils'
import { getPrinterData, savePrinterData, updatePrinterData } from '../db/requests.db'

export const PrintersController = {
  configurePrinter: async (req: Request, res: Response) => {
    console.log('--- CONFIGURE PRINTER ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { printerData, UMerchantNumber } = decryptedData
      const currentPrinterData = await getPrinterData({ mac: printerData.mac, UMerchantNumber })

      if (currentPrinterData) {
        await updatePrinterData(printerData.mac, { ...printerData, updatedAt: new Date() })
        return res.status(200).send({ success: true })
      }

      await savePrinterData({ ...printerData, UMerchantNumber })
      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error configurePrinter', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
