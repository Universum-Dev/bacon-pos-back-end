"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const AccountSchema = new mongoose_1.Schema({
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
exports.Account = (0, mongoose_1.model)("Account", AccountSchema);
