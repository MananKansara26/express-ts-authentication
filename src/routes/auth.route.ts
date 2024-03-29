import express from 'express';
import { validate } from 'express-validation';
import { authController } from './../controllers';
import { authValidation } from './../validations';
const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register,
);
router.post('/login', validate(authValidation.login), authController.login);
router.get(
  '/forgotPassword/:email',
  authController.generateForgotPasswordToken,
);
router.post('/forgotPassword/:token', authController.forgotPassword);

export default router;
