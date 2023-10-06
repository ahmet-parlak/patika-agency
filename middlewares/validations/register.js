const { body } = require('express-validator');

module.exports = [
  body('username').trim().notEmpty().withMessage('Please enter a username!'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please create a password of at least 5 characters!'),
  body('password_confirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match!'),
];
