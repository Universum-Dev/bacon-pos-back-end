import { Schema, model } from 'mongoose'

const EmployeeSchema = new Schema({
  role: { type: String },
  email: { type: String },
  phone: { type: String },
  avatar: { type: String },
  hireDate: { type: Date },
  address: { type: String },
  birthDate: { type: Date },
  publicId: { type: String },
  lastName: { type: String },
  firstName: { type: String },
  accessCode: { type: String },
  terminalId: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const Employee = model('Employee', EmployeeSchema)
