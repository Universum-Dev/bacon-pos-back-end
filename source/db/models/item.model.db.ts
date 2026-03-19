import { Schema, model } from 'mongoose'

const ItemSchema = new Schema({
  name: { type: String },
  wmDbId: { type: String },
  imageUri: { type: String },
  category: { type: String },
  basePrice: { type: String },
  description: { type: String },
  categoryColor: { type: String },
  prepStationId: { type: String },
  UMerchantNumber: { type: String },
  taxes: { type: Array, default: [] },
  isCombo: { type: Boolean, default: false },
  selectedMods: { type: Array, default: [] },
  possibleMods: { type: Array, default: [] },
  selectedAddOns: { type: Array, default: [] },
  possibleAddOns: { type: Array, default: [] },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const Item = model('Item', ItemSchema)
