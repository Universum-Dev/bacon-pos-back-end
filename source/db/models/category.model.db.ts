import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
  name: { type: String },
  color: { type: String },
  wmDbId: { type: String },
  prepStationId: { type: String },
  prepStationName: { type: String },
  UMerchantNumber: { type: String },
  taxes: { type: Array, default: [] },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  prepStationSet: { type: Boolean, default: false }
})

export const Category = model('Category', CategorySchema)
