import express from 'express';
import { getOrders, getOrderById, modifyOrderStatus } from '../controller/orderController';

const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', modifyOrderStatus);

export default router;