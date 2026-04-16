import { Schema, model } from 'mongoose'

const OptionSchema = new Schema(
  {
    name: { type: String },
    quantity: { type: Number },
    price: { type: Schema.Types.Mixed }
  },
  { _id: false }
)

const AddOnModSchema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    options: [OptionSchema],
    canPickMultiple: { type: Boolean }
  },
  { _id: false }
)

const OrderItemSchema = new Schema(
  {
    id: { type: String },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    category: [{ type: String }],
    originalId: { type: String },
    description: { type: String },
    possibleMods: [AddOnModSchema],
    selectedMods: [AddOnModSchema],
    possibleAddOns: [AddOnModSchema],
    selectedAddOns: [AddOnModSchema],
    taxes: [{ type: Schema.Types.Mixed }]
  },
  { _id: false }
)

const SendBatchSchema = new Schema(
  {
    items: [OrderItemSchema],
    timestamp: { type: Number }
  },
  { _id: false }
)

const OrderSchema = new Schema(
  {
    wmDbId: { type: String },
    items: [OrderItemSchema],
    startedAt: { type: String },
    orderNumber: { type: String },
    sendBatches: [SendBatchSchema],
    UMerchantNumber: { type: String },
    taxes: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    subTotal: { type: Number, default: 0 },
    tableId: { type: String, default: null },
    type: {
      type: String,
      enum: ['Dine in', 'Take out', 'On hold', 'Delivery']
    },
    tableName: { type: String, default: null },
    deleted: { type: Boolean, default: false },
    customerName: { type: String, default: '' },
    itemsSummary: { type: String, default: '' },
    staff: { type: String, default: 'No staff' },
    totalDiscounts: { type: Number, default: 0 },
    tableNumber: { type: Number, default: null },
    status: {
      type: String,
      enum: ['OPEN', 'SEND', 'CLOSED', 'PAID', 'HOLD', 'CANCELLED'],
      default: 'OPEN'
    },
    totalServiceCharges: { type: Number, default: null },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
    paymentMethod: { type: String, default: 'Unassigned' }
  },
  {
    timestamps: true
  }
)

export const Order = model('Order', OrderSchema)
