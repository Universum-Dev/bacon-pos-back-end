import { Schema, model } from 'mongoose'

const PinPadSchema = new Schema(
  {
    ip: { type: String },
    name: { type: String },
    port: { type: String },
    timeout: { type: String },
    publicId: { type: String },
    terminalId: { type: String },
    merchantKey: { type: String },
    tipOptions: Schema.Types.Mixed,
    enableTipping: { type: Boolean },
    UMerchantNumber: { type: String },
    tippingTypesEnabled: Schema.Types.Mixed,
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
  },
  { timestamps: true }
)

export const PinPad = model('PinPad', PinPadSchema)
