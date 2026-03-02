import { Schema, model } from 'mongoose'

const AccountSchema = new Schema({
  name: { type: String },
  email: { type: String },
  DBAName: { type: String },
  owner: Schema.Types.Mixed,
  industry: { type: String },
  publicId: { type: String },
  address: Schema.Types.Mixed,
  profileImage: { type: String },
  UMerchantNumber: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const Account = model('Account', AccountSchema)
