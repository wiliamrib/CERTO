const express = require('express');
const PaymentController = require('../controllers/paymentController');
const { validatePayment, validate } = require('../utils/validator');

const router = express.Router();
const paymentController = new PaymentController();

router.post(
  '/create-intent',
  validatePayment,
  validate,
  paymentController.createPaymentIntent.bind(paymentController)
);

router.post(
  '/confirm',
  paymentController.confirmPayment.bind(paymentController)
);

router.get('/', paymentController.getPayments.bind(paymentController));

router.delete('/:id', paymentController.deletePayment.bind(paymentController));

module.exports = router;