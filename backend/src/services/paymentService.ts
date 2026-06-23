import { razorpayInstance } from '../config/Razorpay';
import * as orderService from './orderService';
import * as transactionService from './transactionService';
import crypto from 'crypto';
import { decryptUrl } from '../utils/cryptoUtils';

export const createRazorpayOrder = async (orderData: any) => {
  const options = {
    amount: orderData.totalAmount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`
  };

  const razorpayOrder = await razorpayInstance.orders.create(options);

  const newDbOrder = await orderService.createCheckoutOrder(orderData, razorpayOrder.id);

  if (!newDbOrder) {
    throw new Error('Failed to create order in database');
  }

  return {
    razorpayOrder,
    dbOrderId: newDbOrder._id.toString()
  };
};

export const verifyRazorpayPayment = async (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  dbOrderId: string,
  amount: number
) => {
  const secret = process.env.RAZORPAY_KEY_SECRET as string;

  // Generate the expected signature
  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (isAuthentic) {
    // 1. Record successful transaction
    await transactionService.recordTransaction({
      orderId: dbOrderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount,
      status: 'success'
    });

    // 2. Update Order Status
    await orderService.updateOrderStatus(dbOrderId, 'Paid');

    // 3. SECURE URL LOGIC: Fetch populated order details
    const order = await orderService.findOrderById(dbOrderId);
    
    let digitalItems: any[] = [];
    
    // Filter out digital items and decrypt their URLs
    if (order && order.items) {
      digitalItems = order.items
        .filter((item: any) => item.product && item.product.isDigital)
        .map((item: any) => ({
          id: item.product._id,
          name: item.product.name,
          url: item.product.url ? decryptUrl(item.product.url) : null // Decrypting here!
        }));
    }

    // Return success along with the secure links
    return { 
      success: true, 
      digitalItems 
    };

  } else {
    // 1. Record failed transaction
    await transactionService.recordTransaction({
      orderId: dbOrderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount,
      status: 'failed'
    });

    // 2. Cancel Order
    await orderService.updateOrderStatus(dbOrderId, 'Cancelled');
    
    // Return failure
    return { success: false };
  }
};