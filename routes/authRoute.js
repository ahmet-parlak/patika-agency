const express = require('express');
const authController = require('../controller/authController');

const redirectMiddleware = require('../middlewares/redirectMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const registerValidation = require('../middlewares/validations/register');

const router = express.Router();

router.post(
  '/register',
  redirectMiddleware,
  registerValidation,
  authController.register
);
router.post('/login', redirectMiddleware, authController.login);
router.get('/logout', authController.logout);

module.exports = router;
