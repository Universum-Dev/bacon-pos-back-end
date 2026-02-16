import { Schema, model } from 'mongoose'

const PrinterSchema = new Schema({
  ip: { type: String },
  mac: { type: String },
  name: { type: String },
  model: { type: String },
  publicId: { type: String },
  terminalId: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const Printer = model('Printer', PrinterSchema)
