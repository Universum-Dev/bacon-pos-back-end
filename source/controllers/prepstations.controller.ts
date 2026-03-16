import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils/encryption.utils'
import { savePrepStationData, updatePrepStationData } from '../db/requests.db'

export const PrepStationsController = {
  createPrepStation: async (req: Request, res: Response) => {
    console.log('--- CREATE PREP STATION ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await savePrepStationData({
        ...decryptedData.prepStationData,
        UMerchantNumber: decryptedData.UMerchantNumber
      })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createPrepStation', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updatePrepStation: async (req: Request, res: Response) => {
    console.log('--- UPDATE PREP STATION ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const prepStationWmDbId = decryptedData.prepStationData.wmDbId
      await updatePrepStationData(prepStationWmDbId, { ...decryptedData.prepStationData, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updatePrepStation', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deletePrepStation: async (req: Request, res: Response) => {
    console.log('--- DELETE PREP STATION ---')

    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const prepStationWmDbId = decryptedData.prepStationData.wmDbId
      await updatePrepStationData(prepStationWmDbId, { deleted: true })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deletePrepStation', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
