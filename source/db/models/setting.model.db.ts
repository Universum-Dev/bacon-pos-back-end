import { Schema, model } from 'mongoose'

const SettingSchema = new Schema({
  language: { type: String },
  publicId: { type: String },
  terminalId: { type: String },
  posInterface: { type: String },
  isMainPOSTerminal: { type: Boolean },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const Setting = model('Setting', SettingSchema)
