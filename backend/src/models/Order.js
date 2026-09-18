const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: String, default: '' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  total: { type: Number, required: true },
  selectedColor: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String },
    city: { type: String, required: true },
    district: { type: String, required: true },
    streetAddress: { type: String, required: true },
    deliveryNotes: { type: String },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    couponCode: { type: String },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['EVC_PLUS', 'ZAAD', 'SAHAL', 'EDAHAB', 'CASH_ON_DELIVERY', 'CARD'],
    },
    paymentStatus: {
      type: String,
      default: 'PENDING',
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
    },
    paymentReference: { type: String },
    orderStatus: {
      type: String,
      default: 'PENDING',
      enum: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    },
    timeline: [
      {
        status: { type: String, required: true },
        description: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
