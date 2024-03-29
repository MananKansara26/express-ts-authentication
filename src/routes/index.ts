import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);

export = router; // why we use this in ts???
