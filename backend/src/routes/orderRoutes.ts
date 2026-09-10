import express from 'express';
import { getOrders, getOrderById, modifyOrderStatus, createCodOrBankOrder, trackOrder } from '../controller/orderController';

const router = express.Router();

router.get('/', getOrders);
router.post('/checkout-offline', createCodOrBankOrder);
router.get('/track/:orderId', trackOrder);
router.get('/:id', getOrderById);
router.patch('/:id/status', modifyOrderStatus);

export default router;