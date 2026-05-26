import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils/encryption.utils'
import { updateSettingsData, updateTerminalDeviceData } from '../db/requests.db'

export const SettingsController = {
  updateSettings: async (req: Request, res: Response) => {
    console.log('--- UPDATE SETTINGS ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { settingsData, UMerchantNumber } = decryptedData

      const settingsDataUpdated = await updateSettingsData(UMerchantNumber, settingsData)
      req.io?.emit('settings_updated', { settingsData: settingsDataUpdated, UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateSettings', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateDeviceInformation: async (req: Request, res: Response) => {
    console.log('--- UPDATE DEVICE INFORMATION ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { deviceInformation, UMerchantNumber } = decryptedData

      const terminalDeviceDataUpdated = await updateTerminalDeviceData(deviceInformation.serialNumber, { deviceName: deviceInformation.deviceName })
      req.io?.emit('device_information_updated', { deviceInformation: terminalDeviceDataUpdated, UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateDeviceInformation', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
