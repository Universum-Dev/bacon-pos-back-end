import { Types } from 'mongoose'

import { Account, ModeSet, DiningOption, Order, Payment, Employee, Printer, PinPad, Setting, Category, PrepStation, AddOnSet, Item, ServiceArea, TableMap } from './models'

export const getAccountsData = async () => {
  try {
    const accountData = await Account.find({}).lean().exec()
    return accountData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPinPadsData = async () => {
  try {
    const pinPadsData = await PinPad.find({}).lean().exec()
    return pinPadsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPrintersData = async () => {
  try {
    const printersData = await Printer.find({}).lean().exec()
    return printersData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPaymentsData = async () => {
  try {
    const paymentsData = await Payment.find({ deleted: false }).lean().exec()
    return paymentsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getDiningOptionsData = async () => {
  try {
    const diningOptionsData = await DiningOption.find({ deleted: false }).lean().exec()
    return diningOptionsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getEmployeesData = async () => {
  try {
    const employeesData = await Employee.find({ deleted: false }).lean().exec()
    return employeesData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPaymentData = async (queryToSearch: object) => {
  try {
    const paymentData = await Payment.findOne(queryToSearch).lean().exec()
    return paymentData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAccountData = async (queryToSearch: object) => {
  try {
    const accountData = await Account.findOne(queryToSearch).lean().exec()
    return accountData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getSettingsDataBySearch = async (queryToSearch: object) => {
  try {
    const settingsData = await Setting.findOne(queryToSearch).lean().exec()
    return settingsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateAccountData = async (accountId: string, dataToUpdate: object) => {
  try {
    const accountDataUpdated = await Account.findOneAndUpdate({ _id: new Types.ObjectId(accountId) }, { $set: dataToUpdate }, { new: true })
      .lean()
      .exec()

    return accountDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getSettingsData = async () => {
  try {
    const settingsData = await Setting.find({}).lean().exec()
    return settingsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getCategoriesData = async () => {
  try {
    const categoriesData = await Category.find({ deleted: false }).lean().exec()
    return categoriesData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getModeSetsData = async () => {
  try {
    const modeSetsData = await ModeSet.find({ deleted: false }).lean().exec()
    return modeSetsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAddOnSetsData = async () => {
  try {
    const addOnSetsData = await AddOnSet.find({ deleted: false }).lean().exec()
    return addOnSetsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getItemsData = async () => {
  try {
    const itemsData = await Item.find({ deleted: false }).lean().exec()
    return itemsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getOrdersData = async () => {
  try {
    const ordersData = await Order.find({ deleted: false }).lean().exec()
    return ordersData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getServiceAreasData = async () => {
  try {
    const serviceAreasData = await ServiceArea.find({ deleted: false }).lean().exec()
    return serviceAreasData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getTableMapsData = async (queryToSearch: object) => {
  try {
    const tableMapsData = await TableMap.find({ ...queryToSearch })
      .lean()
      .exec()
    return tableMapsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPrepStationsData = async () => {
  try {
    const prepStationsData = await PrepStation.find({ deleted: false }).lean().exec()
    return prepStationsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPinPadData = async (queryToSearch: object) => {
  try {
    const pinPadData = await PinPad.findOne(queryToSearch).lean().exec()
    return pinPadData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPrinterData = async (queryToSearch: object) => {
  try {
    const printerData = await Printer.findOne(queryToSearch).lean().exec()
    return printerData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getEmployeeData = async (queryToSearch: object) => {
  try {
    const employeeData = await Employee.findOne(queryToSearch).lean().exec()
    return employeeData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const saveCategoryData = async (categoryDataToSave: object) => {
  try {
    const newCategoryData = new Category({ _id: new Types.ObjectId(), ...categoryDataToSave })
    const createdCategory = await newCategoryData.save()
    return createdCategory.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const savePaymentData = async (paymentDataToSave: object) => {
  try {
    const newPaymentData = new Payment({ _id: new Types.ObjectId(), ...paymentDataToSave })
    const createdPayment = await newPaymentData.save()
    return createdPayment.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveOrderData = async (orderDataToSave: object) => {
  try {
    const newOrderData = new Order({ _id: new Types.ObjectId(), ...orderDataToSave })
    const createdOrder = await newOrderData.save()
    return createdOrder.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveModeSetData = async (modeSetDataToSave: object) => {
  try {
    const newModeSetData = new ModeSet({ _id: new Types.ObjectId(), ...modeSetDataToSave })
    const createdModeSet = await newModeSetData.save()
    return createdModeSet.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveAddOnSetData = async (addOnSetDataToSave: object) => {
  try {
    const newAddOnSetData = new AddOnSet({ _id: new Types.ObjectId(), ...addOnSetDataToSave })
    const createdAddOnSet = await newAddOnSetData.save()
    return createdAddOnSet.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveItemData = async (itemDataToSave: object) => {
  try {
    const newItemData = new Item({ _id: new Types.ObjectId(), ...itemDataToSave })
    const createdItem = await newItemData.save()
    return createdItem.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveAccountData = async (accountDataToSave: object) => {
  try {
    const newAccountData = new Account({ _id: new Types.ObjectId(), ...accountDataToSave })
    const createdAccount = await newAccountData.save()
    return createdAccount.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveSettingsData = async (settingsDataToSave: object) => {
  try {
    const newSettingsData = new Setting({ _id: new Types.ObjectId(), ...settingsDataToSave })
    const createdSettings = await newSettingsData.save()
    return createdSettings.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveEmployeeData = async (employeeDataToSave: object) => {
  try {
    const newEmployeeData = new Employee({ _id: new Types.ObjectId(), ...employeeDataToSave })
    const createdEmployee = await newEmployeeData.save()
    return createdEmployee.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const savePrinterData = async (printerDataToSave: object) => {
  try {
    const newPrinterData = new Printer({ _id: new Types.ObjectId(), ...printerDataToSave })
    const createdPrinter = await newPrinterData.save()
    return createdPrinter.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const savePinPadData = async (pinPadDataToSave: object) => {
  try {
    const newPinPadData = new PinPad({ _id: new Types.ObjectId(), ...pinPadDataToSave })
    const createdPinPad = await newPinPadData.save()
    return createdPinPad.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveDiningOptionData = async (diningOptionDataToSave: object) => {
  try {
    const newDiningOptionData = new DiningOption({ _id: new Types.ObjectId(), ...diningOptionDataToSave })
    const createdDiningOption = await newDiningOptionData.save()
    return createdDiningOption.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveTableMapData = async (tableMapDataToSave: object) => {
  try {
    const newTableMapData = new TableMap({ _id: new Types.ObjectId(), ...tableMapDataToSave })
    const createdTableMap = await newTableMapData.save()
    return createdTableMap.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const saveServiceAreaData = async (serviceAreaDataToSave: object) => {
  try {
    const newServiceAreaData = new ServiceArea({ _id: new Types.ObjectId(), ...serviceAreaDataToSave })
    const createdServiceArea = await newServiceAreaData.save()
    return createdServiceArea.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const savePrepStationData = async (prepStationDataToSave: object) => {
  try {
    const newPrepStationData = new PrepStation({ _id: new Types.ObjectId(), ...prepStationDataToSave })
    const createdPrepStation = await newPrepStationData.save()
    return createdPrepStation.toObject()
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const updateCategoryData = async (categoryWmDbId: string, dataToUpdate: object) => {
  try {
    const categoryDataUpdated = await Category.findOneAndUpdate({ wmDbId: categoryWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return categoryDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateModeSetData = async (modeSetWmDbId: string, dataToUpdate: object) => {
  try {
    const modeSetDataUpdated = await ModeSet.findOneAndUpdate({ wmDbId: modeSetWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return modeSetDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateAddOnSetData = async (addOnSetWmDbId: string, dataToUpdate: object) => {
  try {
    const addOnSetDataUpdated = await AddOnSet.findOneAndUpdate({ wmDbId: addOnSetWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return addOnSetDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateItemData = async (itemWmDbId: string, dataToUpdate: object) => {
  try {
    const itemDataUpdated = await Item.findOneAndUpdate({ wmDbId: itemWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return itemDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateEmployeeData = async (employeeId: string, dataToUpdate: object) => {
  try {
    const employeeDataUpdated = await Employee.findOneAndUpdate({ wmDbId: employeeId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return employeeDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updatePinPadData = async (pinPadIp: string, dataToUpdate: object) => {
  try {
    const pinPadDataUpdated = await PinPad.findOneAndUpdate({ ip: pinPadIp }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return pinPadDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updatePrinterData = async (printerMac: string, dataToUpdate: object) => {
  try {
    const printerDataUpdated = await Printer.findOneAndUpdate({ mac: printerMac }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return printerDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updatePrepStationData = async (prepStationWmDbId: string, dataToUpdate: object) => {
  try {
    const prepStationDataUpdated = await PrepStation.findOneAndUpdate({ wmDbId: prepStationWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return prepStationDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateOrderData = async (orderWmDbId: string, dataToUpdate: object) => {
  try {
    const orderDataUpdated = await Order.findOneAndUpdate({ wmDbId: orderWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return orderDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateServiceAreaData = async (serviceAreaWmDbId: string, dataToUpdate: object) => {
  try {
    const serviceAreaDataUpdated = await ServiceArea.findOneAndUpdate({ wmDbId: serviceAreaWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return serviceAreaDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateDiningOptionData = async (diningOptionWmDbId: string, dataToUpdate: object) => {
  try {
    const diningOptionDataUpdated = await DiningOption.findOneAndUpdate({ wmDbId: diningOptionWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return diningOptionDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateTableMapData = async (tableMapWmDbId: string, dataToUpdate: object) => {
  try {
    const tableMapDataUpdated = await TableMap.findOneAndUpdate({ wmDbId: tableMapWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return tableMapDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateSettingsData = async (UMerchantNumber: string, dataToUpdate: object) => {
  try {
    const settingsDataUpdated = await Setting.findOneAndUpdate({ UMerchantNumber }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return settingsDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getOrderDataToSend = async (wmDbId: string) => {
  try {
    const orderData = await Order.findOne({ wmDbId }).lean().exec()
    return orderData
  } catch (error) {
    console.log(error)
    throw error
  }
}
