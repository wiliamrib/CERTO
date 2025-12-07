require('dotenv').config();
const mongoose = require('mongoose');
const Payment = require('../models/paymentModel');
const Donation = require('../models/donationModel');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'admin' }).catch(e => { throw e; });
  console.log('Connected for seeding');

  const p = new Payment({
    name: 'Teste Seed',
    cpf: '11122233344',
    paymentMethod: 'credit_card',
    amount: 10.0,
    stripePaymentIntentId: 'pi_seed_1',
    status: 'completed'
  });
  const d = new Donation({ name: 'Seed Doação', cpf: '99988877766' });

  await p.save();
  await d.save();

  console.log('Seed complete:', p._id.toString(), d._id.toString());
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });