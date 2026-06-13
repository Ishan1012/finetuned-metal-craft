import express from 'express';
import { checkout, paymentVerification } from '../controller/paymentController';

const router = express.Router();

router.post('/checkout', checkout);
router.post('/verify', paymentVerification);

export default router;