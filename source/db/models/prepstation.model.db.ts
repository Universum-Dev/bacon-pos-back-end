import { Schema, model } from 'mongoose'

const PrepStationSchema = new Schema({
  name: { type: String },
  status: { type: String },
  wmDbId: { type: String },
  printer: Schema.Types.Mixed,
  description: { type: String },
  alwaysPrint: { type: Boolean },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

export const PrepStation = model('PrepStation', PrepStationSchema)
