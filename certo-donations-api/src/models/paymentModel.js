const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  cpf: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['pix', 'credit_card'],
    required: true
  },
  amount: {
    type: Number,
    default: null
  },
  stripePaymentIntentId: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);