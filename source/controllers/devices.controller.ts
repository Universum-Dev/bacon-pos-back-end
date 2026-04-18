import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils/encryption.utils'
import { getPinPadData, updatePinPadData, savePinPadData, getPrinterData, savePrinterData, updatePrinterData } from '../db/requests.db'

export const DevicesController = {
  configurePinpad: async (req: Request, res: Response) => {
    console.log('--- CONFIGURE PINPAD ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { pinPadData, UMerchantNumber } = decryptedData
      const currentPinPadData = await getPinPadData({ ip: pinPadData.ip, UMerchantNumber })

      if (currentPinPadData) {
        const pinPadDataUpdated = await updatePinPadData(pinPadData.ip, { ...pinPadData, updatedAt: new Date() })
        req.io?.emit('pin_pad_updated', { pinPad: pinPadDataUpdated, UMerchantNumber })

        return res.status(200).send({ success: true })
      }

      const pinPadDataCreated = await savePinPadData({ ...pinPadData, UMerchantNumber })
      req.io?.emit('pin_pad_updated', { pinPad: pinPadDataCreated, UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error configurePinpad', error)
      return res.status(500).send({ success: false, error })
    }
  },
  configurePrinter: async (req: Request, res: Response) => {
    console.log('--- CONFIGURE PRINTER ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { printerData, UMerchantNumber } = decryptedData
      const currentPrinterData = await getPrinterData({ mac: printerData.mac, UMerchantNumber })

      if (currentPrinterData) {
        const printerDataUpdated = await updatePrinterData(printerData.mac, { ...printerData, updatedAt: new Date() })
        req.io?.emit('printer_updated', { printer: printerDataUpdated, UMerchantNumber })

        return res.status(200).send({ success: true })
      }

      const printerDataCreated = await savePrinterData({ ...printerData, UMerchantNumber })
      req.io?.emit('printer_updated', { printer: printerDataCreated, UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error configurePrinter', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
