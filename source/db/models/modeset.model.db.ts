import { Schema, model } from 'mongoose'

const ModeSetSchema = new Schema({
  name: { type: String },
  wmDbId: { type: String },
  options: Schema.Types.Mixed,
  UMerchantNumber: { type: String },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  canPickMultiple: { type: Boolean, default: false }
})

export const ModeSet = model('ModeSet', ModeSetSchema)
