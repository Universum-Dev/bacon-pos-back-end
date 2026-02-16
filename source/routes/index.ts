import CryptoJS from 'crypto-js'
import { Router, Request, Response } from 'express'

import { config } from '../config'
import { checkDataExpiration } from '../utils'
import { handleFirstSync } from '../utils/firstSync.utils'

const appRouter = Router()

appRouter.get('/health-check', (req: Request, res: Response) => res.send('Bacon POS local Back End is working'))
appRouter.post('/first-sync', async (req: Request, res: Response) => {
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
      const firstSyncResult = await handleFirstSync(decryptedData)

      if (firstSyncResult) {
        return res.status(200).send({ message: true })
      } else {
        return res.status(400).send({ message: 'First sync failed' })
      }
    }

    console.log('--- ERROR PING IP ADDRESS. TOKEN EXPIRED ---')
    return res.status(401).send('Token expired')
  } catch (error) {
    console.log('Error ping', error)
    return res.status(500).send('Server error. Encryption failed.')
  }
})

export default appRouter
