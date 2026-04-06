import { Request, Response } from 'express'

import { updateSettingsData } from '../db/requests.db'
import { handleGetDataDecrypted } from '../utils/encryption.utils'

export const SettingsController = {
  updateSettings: async (req: Request, res: Response) => {
    console.log('--- UPDATE SETTINGS ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { settingsData, UMerchantNumber } = decryptedData

      await updateSettingsData(UMerchantNumber, settingsData)

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateSettings', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
