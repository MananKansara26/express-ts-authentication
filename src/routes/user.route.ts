import express from 'express';
import { validate } from 'express-validation';
import { userController } from './../controllers';
import { userValidation } from './../validations';
const router = express.Router();

router.get('/', userController.getUsers);
router.get(
  '/:userId',
  validate(userValidation.getUser),
  userController.getUser,
);

export default router;
