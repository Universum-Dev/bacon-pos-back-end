import { Types } from 'mongoose'

import { Account, Employee, Printer, PinPad, Setting } from './models'

export const getAccountData = async (queryToSearch: object) => {
  try {
    const accountData = await Account.findOne(queryToSearch).lean().exec()
    return accountData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getSettingsData = async (queryToSearch: object) => {
  try {
    const settingsData = await Setting.findOne(queryToSearch).lean().exec()
    return settingsData
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
