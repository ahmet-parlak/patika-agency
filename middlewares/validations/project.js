const { body } = require('express-validator');

module.exports = [
  body('title').notEmpty().withMessage('Please enter project title!'),
];
