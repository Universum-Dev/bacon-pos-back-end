import { Schema, model } from 'mongoose'

const AccountSchema = new Schema({
  name: { type: String },
  city: { type: String },
  email: { type: String },
  phone: { type: String },
  street: { type: String },
  zipCode: { type: String },
  DBAName: { type: String },
  industry: { type: String },
  publicId: { type: String },
  profileImage: { type: String },
  UMerchantNumber: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const Account = model('Account', AccountSchema)
