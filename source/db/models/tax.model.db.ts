import { Schema, model } from 'mongoose'

const TaxSchema = new Schema(
  {
    name: { type: String },
    type: { type: String },
    value: { type: Number },
    wmDbId: { type: String },
    status: { type: String },
    UMerchantNumber: { type: String },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
  },
  { timestamps: true }
)

export const Tax = model('Tax', TaxSchema)
