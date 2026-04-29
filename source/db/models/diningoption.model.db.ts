import { Schema, model } from 'mongoose'

const DiningOptionSchema = new Schema(
  {
    name: { type: String },
    wmDbId: { type: String },
    behavior: { type: String },
    UMerchantNumber: { type: String },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    setAsDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const DiningOption = model('DiningOption', DiningOptionSchema)
