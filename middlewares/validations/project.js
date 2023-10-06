const { body } = require('express-validator');

module.exports = [
  body('title').trim().notEmpty().withMessage('Please enter project title!'),
];
