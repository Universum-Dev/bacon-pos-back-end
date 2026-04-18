import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveServiceChargeData, updateServiceChargeData } from '../db/requests.db'

export const ServiceChargesController = {
  createServiceCharge: async (req: Request, res: Response) => {
    console.log('--- CREATE SERVICE CHARGE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const serviceChargeCreated = await saveServiceChargeData({ ...decryptedData.serviceChargeData, UMerchantNumber: decryptedData.UMerchantNumber })
      req.io?.emit('service_charge_updated', { serviceCharge: serviceChargeCreated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createServiceCharge', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateServiceCharge: async (req: Request, res: Response) => {
    console.log('--- UPDATE SERVICE CHARGE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const serviceChargeId = decryptedData.serviceChargeData.wmDbId
      const serviceChargeUpdated = await updateServiceChargeData(serviceChargeId, { ...decryptedData.serviceChargeData, updatedAt: new Date() })
      req.io?.emit('service_charge_updated', { serviceCharge: serviceChargeUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateServiceCharge', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteServiceCharge: async (req: Request, res: Response) => {
    console.log('--- DELETE SERVICE CHARGE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const serviceChargeId = decryptedData.serviceChargeData.wmDbId
      const serviceChargeDeleted = await updateServiceChargeData(serviceChargeId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('service_charge_updated', { serviceCharge: serviceChargeDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteServiceCharge', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
