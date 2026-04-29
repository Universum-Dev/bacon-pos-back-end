import { v4 as uuidv4 } from 'uuid'

import {
  getTaxesData,
  getItemsData,
  getOrdersData,
  getPinPadData,
  getAccountData,
  getPinPadsData,
  getPrinterData,
  savePinPadData,
  getPaymentsData,
  getModeSetsData,
  getPrintersData,
  getSettingsData,
  getAccountsData,
  getEmployeeData,
  saveAccountData,
  savePrinterData,
  getDiscountsData,
  getAddOnSetsData,
  getTableMapsData,
  saveEmployeeData,
  saveSettingsData,
  getEmployeesData,
  getPromoCodesData,
  getCategoriesData,
  getPrepStationsData,
  getServiceAreasData,
  saveDiningOptionData,
  getDiningOptionsData,
  getServiceChargesData,
  getSettingsDataBySearch,
  getDiningOptionDataBySearch
} from '../db/requests.db'

export const handleFirstSync = async (decryptedData: any) => {
  try {
    if (!decryptedData.initialSystemSetup || (decryptedData.initialSystemSetup && decryptedData.initialSystemSetup === 'initial')) {
      const UMerchantNumber = decryptedData.accountData.UMerchantNumber
      const currentAccountData = await getAccountData({ UMerchantNumber: decryptedData.accountData.UMerchantNumber })

      if (currentAccountData && currentAccountData.UMerchantNumber !== decryptedData.accountData.UMerchantNumber) {
        return { success: false, message: 'Account data with the same UMerchantNumber does not match. First sync failed.' }
      }

      if (!currentAccountData) {
        const accountOwnerDataParsed = JSON.parse(decryptedData.accountData.owner)
        const accountAddressDataParsed = JSON.parse(decryptedData.accountData.address)

        const accountDataToSet = {
          publicId: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
          owner: {
            name: accountOwnerDataParsed.name,
            email: accountOwnerDataParsed.email
          },
          name: decryptedData.accountData.name,
          email: decryptedData.accountData.email,
          DBAName: decryptedData.accountData.DBAName,
          address: {
            city: accountAddressDataParsed.city,
            phone: accountAddressDataParsed.phone,
            street: accountAddressDataParsed.street,
            zipCode: accountAddressDataParsed.zipCode
          },
          industry: decryptedData.accountData.industry,
          profileImage: decryptedData.accountData.profileImage,
          UMerchantNumber: decryptedData.accountData.UMerchantNumber
        }

        await saveAccountData(accountDataToSet)
      }

      const currentSettingsData = await getSettingsDataBySearch({ UMerchantNumber })

      if (!currentSettingsData) {
        const settingsDataToSet = {
          UMerchantNumber,
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
        const employeeDataInDb = await getEmployeeData({ role: (employeeData as any).role, accessCode: (employeeData as any).accessCode })

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
          status: (employeeData as any).status,
          avatar: (employeeData as any).avatar,
          wmDbId: (employeeData as any).wmDbId,
          address: (employeeData as any).address,
          lastName: (employeeData as any).lastName,
          firstName: (employeeData as any).firstName,
          accessCode: (employeeData as any).accessCode,
          hireDate: new Date((employeeData as any).hireDate),
          birthDate: new Date((employeeData as any).birthDate),
          UMerchantNumber: (employeeData as any).UMerchantNumber
        }

        await saveEmployeeData(employeeDataToSet)
      }

      for (const diningOptionData of decryptedData.diningOptionsData) {
        const diningOptionDataInDb = await getDiningOptionDataBySearch({
          wmDbId: diningOptionData.wmDbId
        })

        if (diningOptionDataInDb) {
          continue
        }

        const diningOptionDataToSet = {
          setAsDefault: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          name: diningOptionData.name,
          wmDbId: diningOptionData.wmDbId,
          behavior: diningOptionData.behavior,
          UMerchantNumber: diningOptionData.UMerchantNumber
        }

        await saveDiningOptionData(diningOptionDataToSet)
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
          UMerchantNumber,
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
          UMerchantNumber,
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
    }

    if (decryptedData.initialSystemSetup === 'additional') {
      const [accountsDataCreated] = await getAccountsData()

      if (!accountsDataCreated) {
        return { success: false, message: 'No account data found. Please complete the initial system setup first.' }
      }

      const itemsData = await getItemsData()
      const taxesData = await getTaxesData()
      const ordersData = await getOrdersData()
      const pinPadsData = await getPinPadsData()
      const printersData = await getPrintersData()
      const modeSetsData = await getModeSetsData()
      const paymentsData = await getPaymentsData()
      const discountsData = await getDiscountsData()
      const employeesData = await getEmployeesData()
      const addOnSetsData = await getAddOnSetsData()
      const categoriesData = await getCategoriesData()
      const promoCodesData = await getPromoCodesData()
      const prepStationsData = await getPrepStationsData()
      const serviceAreasData = await getServiceAreasData()
      const [currentSettingsData] = await getSettingsData()
      const diningOptionsData = await getDiningOptionsData()
      const serviceChargesData = await getServiceChargesData()
      const tableMapsData = await getTableMapsData({ deleted: false })

      console.log('Additional system setup completed. Updating settings data if needed.')
      return {
        success: true,
        data: {
          taxesData,
          itemsData,
          ordersData,
          pinPadsData,
          modeSetsData,
          printersData,
          paymentsData,
          discountsData,
          tableMapsData,
          addOnSetsData,
          employeesData,
          categoriesData,
          promoCodesData,
          prepStationsData,
          serviceAreasData,
          diningOptionsData,
          serviceChargesData,
          accountData: accountsDataCreated,
          settingsData: currentSettingsData
        }
      }
    }

    return { success: true, data: null }
  } catch (error) {
    console.log(error)
    throw error
  }
}
