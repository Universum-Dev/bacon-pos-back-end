import { Types } from 'mongoose'

import { Account, ModeSet, Employee, Printer, PinPad, Setting, Category, PrepStation, AddOnSet, Item } from './models'

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

export const getEmployeesData = async () => {
  try {
    const employeesData = await Employee.find({}).lean().exec()
    return employeesData
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

export const updatePrepStationData = async (prepStationWmDbId: string, dataToUpdate: object) => {
  try {
    const prepStationDataUpdated = await PrepStation.findOneAndUpdate({ wmDbId: prepStationWmDbId }, { $set: dataToUpdate }, { new: true }).lean().exec()

    return prepStationDataUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}
