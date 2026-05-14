import { Schema, model } from 'mongoose'

const CustomerSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    notes: { type: String },
    wmDbId: { type: String },
    address: { type: String },
    apartmentUnit: { type: String },
    addressesJson: { type: String },
    UMerchantNumber: { type: String },
    deliveryInstructions: { type: String },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
  },
  { timestamps: true }
)

export const Customer = model('Customer', CustomerSchema)
