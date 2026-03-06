import CryptoJS from 'crypto-js'

import { config } from '../config'

export const handleGetDataDecrypted = (cipherText: string, iv: string) => {
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

  return JSON.parse(plaintext)
}
