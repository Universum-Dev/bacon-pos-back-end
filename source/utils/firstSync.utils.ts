import { v4 as uuidv4 } from 'uuid'

import { getAccountData, getEmployeeData, getPinPadData, getPrinterData, getSettingsData, saveAccountData, saveEmployeeData, savePinPadData, savePrinterData, saveSettingsData } from '../db/requests.db'

export const handleFirstSync = async (decryptedData: any) => {
  try {
    const currentAccountData = await getAccountData({ UMerchantNumber: decryptedData.accountData.UMerchantNumber })

    if (currentAccountData && currentAccountData.UMerchantNumber !== decryptedData.accountData.UMerchantNumber) {
      return false
    }

    if (!currentAccountData) {
      const accountAddressDataParsed = JSON.parse(decryptedData.accountData.address)

      const accountDataToSet = {
        publicId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        city: accountAddressDataParsed.city,
        name: decryptedData.accountData.name,
        phone: accountAddressDataParsed.phone,
        email: decryptedData.accountData.email,
        street: accountAddressDataParsed.street,
        zipCode: accountAddressDataParsed.zipCode,
        DBAName: decryptedData.accountData.DBAName,
        industry: decryptedData.accountData.industry,
        profileImage: decryptedData.accountData.profileImage,
        UMerchantNumber: decryptedData.accountData.UMerchantNumber
      }

      await saveAccountData(accountDataToSet)
    }

    const currentSettingsData = await getSettingsData({ terminalId: decryptedData.settingsData.id })

    if (!currentSettingsData) {
      const settingsDataToSet = {
        publicId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        terminalId: decryptedData.settingsData.id,
        language: decryptedData.settingsData.language,
        isMainPOSTerminal: decryptedData.isMainPOSTerminal,
        posInterface: decryptedData.settingsData.POSInterface
      }

      await saveSettingsData(settingsDataToSet)
    }

    for (const employeeData of decryptedData.employeesData) {
      const employeeDataInDb = await getEmployeeData({ role: (employeeData as any).role, accessCode: (employeeData as any).accessCode, terminalId: decryptedData.settingsData.id })

      if (employeeDataInDb) {
        continue
      }

      const employeeDataToSet = {
        publicId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: (employeeData as any).role,
        email: (employeeData as any).email,
        phone: (employeeData as any).phone,
        avatar: (employeeData as any).avatar,
        address: (employeeData as any).address,
        lastName: (employeeData as any).lastName,
        terminalId: decryptedData.settingsData.id,
        firstName: (employeeData as any).firstName,
        accessCode: (employeeData as any).accessCode,
        hireDate: new Date((employeeData as any).hireDate),
        birthDate: new Date((employeeData as any).birthDate)
      }

      await saveEmployeeData(employeeDataToSet)
    }

    const pinPadsDataParsed = JSON.parse(decryptedData.settingsData.pinPads)

    for (const pinPadData of pinPadsDataParsed) {
      const pinPadDataInDb = await getPinPadData({ ip: (pinPadData as any).ip, port: (pinPadData as any).port, terminalId: decryptedData.settingsData.id })

      if (pinPadDataInDb) {
        continue
      }

      const tippingTypesToSet = {} as { [key: string]: boolean }

      for (const tippinType of Object.keys(pinPadData.tippingTypesEnabled)) {
        tippingTypesToSet[tippinType] = pinPadData.tippingTypesEnabled[tippinType] === 1
      }

      const pinPadDataToSet = {
        publicId: uuidv4(),
        ip: pinPadData.ip,
        name: pinPadData.name,
        port: pinPadData.port,
        createdAt: new Date(),
        updatedAt: new Date(),
        timeout: pinPadData.timeout,
        tipOptions: pinPadData.tipOptions,
        merchantKey: pinPadData.merchantKey,
        tippingTypesEnabled: tippingTypesToSet,
        terminalId: decryptedData.settingsData.id,
        enableTipping: pinPadData.enableTipping === 1
      }

      await savePinPadData(pinPadDataToSet)
    }

    const printersDataParsed = JSON.parse(decryptedData.settingsData.printers)

    for (const printerData of printersDataParsed) {
      const printerDataInDb = await getPrinterData({ ip: (printerData as any).ip, mac: (printerData as any).mac, terminalId: decryptedData.settingsData.id })

      if (printerDataInDb) {
        continue
      }

      const printerDataToSet = {
        publicId: uuidv4(),
        ip: printerData.ip,
        mac: printerData.mac,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: printerData.name,
        model: printerData.model,
        terminalId: decryptedData.settingsData.id
      }

      await savePrinterData(printerDataToSet)
    }

    return true
  } catch (error) {
    console.log(error)
    throw error
  }
}
