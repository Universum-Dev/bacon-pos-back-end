import { Schema, model } from 'mongoose'

const TableMapSchema = new Schema({
  items: { type: String },
  wmDbId: { type: String },
  serviceAreaId: { type: String },
  UMerchantNumber: { type: String },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const TableMap = model('TableMap', TableMapSchema)
