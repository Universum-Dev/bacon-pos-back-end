import CryptoJS from 'crypto-js'
import { Request, Response } from 'express'

import { config } from '../config'
import { checkDataExpiration } from '../utils'
import { handleFirstSync } from '../utils/firstSync.utils'

export const SyncController = {
  firstSync: async (req: Request, res: Response) => {
    console.log('--- CONNECTION STARTED ---')
    const { cipherText, iv } = req.body

    try {
      const key = CryptoJS.SHA256(config.server.secret || '')
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(cipherText)
      })
      const bytes = CryptoJS.AES.decrypt(cipherParams, key, {
        iv: CryptoJS.enc.Base64.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })

      const plaintext = bytes.toString(CryptoJS.enc.Utf8)
      const decryptedData = JSON.parse(plaintext)

      const dataIsNotExpired = checkDataExpiration(decryptedData.timestampOfData, 'two-minutes')

      if (dataIsNotExpired) {
        const { success, data, message } = await handleFirstSync(decryptedData)

        if (success) {
          return res.status(200).send({ data, message: true })
        }

        return res.status(400).send({ message })
      }

      console.log('--- ERROR PING IP ADDRESS. TOKEN EXPIRED ---')
      return res.status(401).send('Token expired')
    } catch (error) {
      console.log('Error ping', error)
      return res.status(500).send('Server error. Encryption failed.')
    }
  }
}
