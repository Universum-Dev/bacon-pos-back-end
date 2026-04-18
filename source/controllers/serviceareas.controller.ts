import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils/encryption.utils'
import { saveServiceAreaData, updateServiceAreaData, getTableMapsData, updateTableMapData } from '../db/requests.db'

export const ServiceAreasController = {
  createServiceArea: async (req: Request, res: Response) => {
    console.log('--- CREATE SERVICE AREA ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const serviceAreaCreated = await saveServiceAreaData({
        ...decryptedData.serviceAreaData,
        UMerchantNumber: decryptedData.UMerchantNumber
      })
      req.io?.emit('service_area_updated', { serviceArea: serviceAreaCreated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createServiceArea', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateServiceArea: async (req: Request, res: Response) => {
    console.log('--- UPDATE SERVICE AREA ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const serviceAreaWmDbId = decryptedData.serviceAreaData.wmDbId
      const serviceAreaUpdated = await updateServiceAreaData(serviceAreaWmDbId, { ...decryptedData.serviceAreaData, updatedAt: new Date() })
      req.io?.emit('service_area_updated', { serviceArea: serviceAreaUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateServiceArea', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteServiceArea: async (req: Request, res: Response) => {
    console.log('--- DELETE SERVICE AREA ---')

    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const serviceAreaWmDbId = decryptedData.serviceAreaData.wmDbId
      const serviceAreaDeleted = await updateServiceAreaData(serviceAreaWmDbId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('service_area_updated', { serviceArea: serviceAreaDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

      const relatedTableMaps = await getTableMapsData({ serviceAreaId: serviceAreaWmDbId })

      for await (const tableMap of relatedTableMaps) {
        const tableMapDeleted = await updateTableMapData(String(tableMap.wmDbId), { deleted: true, updatedAt: new Date() })
        req.io?.emit('table_map_updated', { tableMap: tableMapDeleted, UMerchantNumber: decryptedData.UMerchantNumber })
      }

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteServiceArea', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
