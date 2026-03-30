import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { saveEmployeeData, updateEmployeeData } from '../db/requests.db'

export const EmployeesController = {
  createEmployee: async (req: Request, res: Response) => {
    console.log('--- CREATE EMPLOYEE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      await saveEmployeeData({ ...decryptedData.employeeData, UMerchantNumber: decryptedData.UMerchantNumber })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error createEmployee', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateEmployee: async (req: Request, res: Response) => {
    console.log('--- UPDATE EMPLOYEE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const employeeId = decryptedData.employeeData.wmDbId
      await updateEmployeeData(employeeId, { ...decryptedData.employeeData, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateEmployee', error)
      return res.status(500).send({ success: false, error })
    }
  },
  deleteEmployee: async (req: Request, res: Response) => {
    console.log('--- DELETE EMPLOYEE ---')
    const { cipherText, iv } = req.body

    try {
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const employeeId = decryptedData.employeeData.wmDbId
      await updateEmployeeData(employeeId, { deleted: true, updatedAt: new Date() })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error deleteEmployee', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
