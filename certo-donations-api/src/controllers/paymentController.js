const Payment = require('../models/paymentModel');
const crypto = require('crypto');

let stripeClient = null;
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_FAKE = process.env.STRIPE_FAKE === 'true';

if (!STRIPE_FAKE && STRIPE_SECRET) {
  try {
    stripeClient = require('stripe')(STRIPE_SECRET);
  } catch (e) {
    console.warn('Stripe init failed, falling back to fake mode:', e.message);
    stripeClient = null;
  }
}

class PaymentController {
  async createPaymentIntent(req, res, next) {
    try {
      const { name, cpf, amount } = req.body;
      if (!cpf) return res.status(400).json({ message: 'CPF obrigatório' });

      if (STRIPE_FAKE || !stripeClient) {
        const fakeIntentId = 'pi_fake_' + Date.now();
        const fakeClientSecret = 'cs_fake_' + crypto.randomBytes(8).toString('hex');

        const payment = new Payment({
          name: name || null,
          cpf,
          paymentMethod: 'credit_card',
          amount: amount || null,
          stripePaymentIntentId: fakeIntentId,
          status: 'completed'
        });

        await payment.save();

        return res.status(201).json({
          clientSecret: fakeClientSecret,
          paymentId: payment._id.toString(),
          paymentIntent: fakeIntentId,
          fake: true
        });
      }

      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: Math.round((amount || 0) * 100),
        currency: 'brl',
        metadata: { cpf, name: name || 'Anônimo' }
      });

      const payment = new Payment({
        name: name || null,
        cpf,
        paymentMethod: 'credit_card',
        amount: amount || null,
        stripePaymentIntentId: paymentIntent.id,
        status: 'pending'
      });

      await payment.save();

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
        paymentId: payment._id.toString(),
        paymentIntent: paymentIntent.id,
        fake: false
      });
    } catch (err) {
      next(err);
    }
  }

  async confirmPayment(req, res, next) {
    try {
      const { paymentId, paymentIntentId } = req.body;

      if (STRIPE_FAKE || !stripeClient) {
        const payment = await Payment.findByIdAndUpdate(paymentId, { status: 'completed' }, { new: true });
        if (!payment) return res.status(404).json({ message: 'Pagamento não encontrado' });
        return res.json({ status: payment.status, message: 'Pagamento (fake) confirmado' });
      }

      const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);
      const status = paymentIntent.status === 'succeeded' ? 'completed' : 'failed';

      const payment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });

      res.json({ status: payment.status, message: status === 'completed' ? 'Pagamento confirmado' : 'Falhou' });
    } catch (err) {
      next(err);
    }
  }

  async getPayments(req, res, next) {
    try {
      const payments = await Payment.find().sort({ createdAt: -1 });
      res.status(200).json(payments);
    } catch (err) {
      next(err);
    }
  }

  async deletePayment(req, res, next) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByIdAndDelete(id);
      if (!payment) return res.status(404).json({ message: 'Pagamento não encontrado' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PaymentController;