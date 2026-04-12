import { Schema, model } from 'mongoose'

const ServiceChargeSchema = new Schema(
  {
    name: { type: String },
    value: { type: Number },
    status: { type: String },
    wmDbId: { type: String },
    dineIn: { type: Boolean },
    takeout: { type: Boolean },
    delivery: { type: Boolean },
    threshold: { type: Number },
    chargeType: { type: String },
    calculatedOn: { type: String },
    shouldBeTaxed: { type: Boolean },
    UMerchantNumber: { type: String },
    applicableTaxes: [{ type: String }],
    assignToCheckOwner: { type: Boolean },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
  },
  { timestamps: true }
)

export const ServiceCharge = model('ServiceCharge', ServiceChargeSchema)
