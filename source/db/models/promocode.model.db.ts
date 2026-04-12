import { Schema, model } from 'mongoose'

const PromoCodeSchema = new Schema(
  {
    code: { type: String },
    name: { type: String },
    type: { type: String },
    value: { type: Number },
    wmDbId: { type: String },
    status: { type: String },
    appliesTo: { type: String },
    expirationDate: { type: Date },
    UMerchantNumber: { type: String },
    selectedCategories: { type: [String] },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
  },
  { timestamps: true }
)

export const PromoCode = model('PromoCode', PromoCodeSchema)
