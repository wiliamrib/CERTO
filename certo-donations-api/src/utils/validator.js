const { body, validationResult } = require('express-validator');

const validateDonation = [
  body('name')
    .optional()
    .isString()
    .withMessage('O nome deve ser uma string.'),
  body('cpf')
    .optional()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/)
    .withMessage('O CPF deve estar no formato 000.000.000-00 ou 11 dígitos.')
];

const validatePayment = [
  body('name')
    .optional()
    .isString()
    .withMessage('O nome deve ser uma string.'),
  body('cpf')
    .notEmpty()
    .withMessage('CPF é obrigatório.')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/)
    .withMessage('O CPF deve estar no formato 000.000.000-00 ou 11 dígitos.'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('O valor deve ser maior que 0.')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateDonation,
  validatePayment,
  validate
};