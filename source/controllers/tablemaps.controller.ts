import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils/encryption.utils'
import { saveTableMapData, updateTableMapData } from '../db/requests.db'

export const TableMapsController = {
  createTableMap: async (req: Request, res: Response) => {
    console.log('--- CREATE TABLE MAP ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const tableMapCreated = await saveTableMapData({
        ...decryptedData.tableMapData,
        UMerchantNumber: decryptedData.UMerchantNumber
      })
      req.io?.emit('table_map_updated', { tableMap: tableMapCreated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createTableMap', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateTableMap: async (req: Request, res: Response) => {
    console.log('--- UPDATE TABLE MAP ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const tableMapWmDbId = decryptedData.tableMapData.wmDbId
      const tableMapUpdated = await updateTableMapData(tableMapWmDbId, { ...decryptedData.tableMapData, updatedAt: new Date() })
      req.io?.emit('table_map_updated', { tableMap: tableMapUpdated, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateTableMap', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteTableMap: async (req: Request, res: Response) => {
    console.log('--- DELETE TABLE MAP ---')

    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const tableMapWmDbId = decryptedData.tableMapData.wmDbId
      const tableMapDeleted = await updateTableMapData(tableMapWmDbId, { deleted: true, updatedAt: new Date() })
      req.io?.emit('table_map_updated', { tableMap: tableMapDeleted, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteTableMap', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
