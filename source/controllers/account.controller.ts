import { Request, Response } from 'express'

import { handleGetDataDecrypted } from '../utils'
import { getAccountsData, updateAccountData } from '../db/requests.db'

export const AccountController = {
  updateGeneralInformation: async (req: Request, res: Response) => {
    console.log('--- UPDATE ACCOUNT GENERAL INFORMATION ---')
    const { cipherText, iv } = req.body

    try {
      const [currentAccountData] = await getAccountsData()
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { accountData } = decryptedData

      const accountDataUpdated = await updateAccountData(String(currentAccountData._id), {
        updatedAt: new Date(),
        industry: accountData.industry,
        name: accountData.name?.trim().toUpperCase() || '',
        email: accountData.email?.trim().toLowerCase() || '',
        DBAName: accountData.DBAName?.trim().toUpperCase() || '',
        UMerchantNumber: accountData.UMerchantNumber?.trim() || ''
      })
      req.io?.emit('account_updated', { accountData: accountDataUpdated })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateGeneralInformation', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateContactInformation: async (req: Request, res: Response) => {
    console.log('--- UPDATE ACCOUNT CONTACT INFORMATION ---')
    const { cipherText, iv } = req.body

    try {
      const [currentAccountData] = await getAccountsData()
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { accountData } = decryptedData

      const accountDataUpdated = await updateAccountData(String(currentAccountData._id), {
        updatedAt: new Date(),
        address: {
          city: accountData?.city?.trim() || '',
          phone: accountData?.phone?.trim() || '',
          street: accountData?.street?.trim() || '',
          zipCode: accountData?.zipCode?.trim() || ''
        }
      })
      req.io?.emit('account_updated', { accountData: accountDataUpdated })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateContactInformation', error)
      return res.status(500).send({ success: false, error })
    }
  },
  updateLogoInformation: async (req: Request, res: Response) => {
    console.log('--- UPDATE ACCOUNT LOGO INFORMATION ---')
    const { cipherText, iv } = req.body

    try {
      const [currentAccountData] = await getAccountsData()
      const decryptedData = handleGetDataDecrypted(cipherText, iv)
      const { accountData } = decryptedData

      const accountDataUpdated = await updateAccountData(String(currentAccountData._id), {
        updatedAt: new Date(),
        profileImage: accountData.profileImage?.trim() || ''
      })
      req.io?.emit('account_updated', { accountData: accountDataUpdated })

      return res.status(200).send({ success: true })
    } catch (error) {
      console.log('Error updateLogoInformation', error)
      return res.status(500).send({ success: false, error })
    }
  }
}
