import { Schema, model } from 'mongoose'

const TerminalDeviceSchema = new Schema(
  {
    deviceName: { type: String },
    serialNumber: { type: String },
    UMerchantNumber: { type: String },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
  },
  { timestamps: true }
)

export const TerminalDevice = model('TerminalDevice', TerminalDeviceSchema)
