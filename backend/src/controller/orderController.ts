import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import * as emailService from '../services/emailService';

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
    if (updatedOrder) {
      try {
        await emailService.sendOrderStatusUpdateEmail(updatedOrder, status);
      } catch (emailErr) {
        console.warn('Failed to send status update email:', emailErr);
      }
    }
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};

export const createCodOrBankOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const paymentMethod = orderData.paymentMethod || 'cod';
    if (!['cod', 'bank_transfer'].includes(paymentMethod)) {
      return res.status(400).json({ success: false, message: 'Invalid payment method for offline checkout' });
    }

    const initialStatus = paymentMethod === 'cod' ? 'Processing' : 'Created';
    const completeOrderData = {
      ...orderData,
      paymentMethod,
      paymentStatus: 'Pending',
      status: initialStatus,
      razorpayOrderId: `OFFLINE_${Date.now()}`
    };

    const newOrder = await orderService.createCheckoutOrder(completeOrderData);
    if (!newOrder) {
      return res.status(500).json({ success: false, message: 'Could not create order' });
    }

    try {
      await emailService.sendOrderConfirmationEmails(newOrder);
    } catch (e) {
      console.warn('Failed to send order confirmation emails:', e);
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: newOrder,
      orderId: newOrder._id
    });
  } catch (error) {
    console.error('Error placing offline order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

export const trackOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId as string;
    const email = (req.query.email as string || '').toLowerCase().trim();

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID is required' });
    }

    const order = await orderService.findOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found with provided ID' });
    }

    if (email && order.email && order.email.toLowerCase().trim() !== email) {
      return res.status(400).json({ success: false, message: 'Email address does not match this order' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({ success: false, message: 'Failed to track order' });
  }
};
