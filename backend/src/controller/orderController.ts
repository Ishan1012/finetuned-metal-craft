import { Request, Response } from 'express';
import * as orderService from '../services/orderService';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.findAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.findOrderById(req.params.id as string);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
};

export const modifyOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body; // Sent from the admin panel dropdown
    const updatedOrder = await orderService.updateOrderStatus(req.params.id as string, status);
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};
