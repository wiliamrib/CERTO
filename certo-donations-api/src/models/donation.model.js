const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  cpf: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{11}/.test(v); // Validates if CPF is 11 digits
      },
      message: props => `${props.value} não é um CPF válido!`
    }
  },
  anonymous: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;