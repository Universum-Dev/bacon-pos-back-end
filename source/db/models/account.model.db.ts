import { Schema, model } from "mongoose";

const AccountSchema = new Schema({
  name: { type: String },
  owner: { type: String },
  email: { type: String },
  address: { type: String },
  DBAName: { type: String },
  industry: { type: String },
  profileImage: { type: String },
  UMerchantNumber: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});

export const Account = model("Account", AccountSchema);
