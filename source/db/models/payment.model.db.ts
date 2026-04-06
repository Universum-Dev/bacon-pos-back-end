import { Schema, model } from 'mongoose'

const PaymentSchema = new Schema(
  {
    refNo: { type: String },
    wmDbId: { type: String },
    amount: { type: Number },
    method: { type: String },
    status: { type: String },
    acctNo: { type: String },
    payApiId: { type: String },
    authCode: { type: String },
    cardType: { type: String },
    tipAmount: { type: Number },
    invoiceNo: { type: String },
    orderWmDbId: { type: String },
    entryMethod: { type: String },
    cardLastFour: { type: String },
    textResponse: { type: String },
    UMerchantNumber: { type: String },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() }
  },
  {
    timestamps: true
  }
)

export const Payment = model('Payment', PaymentSchema)
