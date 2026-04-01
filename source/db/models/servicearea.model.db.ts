import { Schema, model } from 'mongoose'

const ServiceAreaSchema = new Schema({
  name: { type: String },
  wmDbId: { type: String },
  tables: { type: Number },
  description: { type: String },
  UMerchantNumber: { type: String },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const ServiceArea = model('ServiceArea', ServiceAreaSchema)
