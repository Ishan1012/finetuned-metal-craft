import { razorpayInstance } from '../config/Razorpay';
import * as orderService from './orderService';
import * as transactionService from './transactionService';
import crypto from 'crypto';

export const createRazorpayOrder = async (orderData: any) => {
  // Create the order
  const options = {
    amount: orderData.totalAmount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`
  };

  const razorpayOrder = await razorpayInstance.orders.create(options);

  const newDbOrder = await orderService.createCheckoutOrder(orderData, razorpayOrder.id);

  return {
    razorpayOrder,
    dbOrderId: newDbOrder._id
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
    // successful payment
    await transactionService.recordTransaction({
      orderId: dbOrderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount,
      status: 'success'
    });

    await orderService.updateOrderStatus(dbOrderId, 'Paid');
    return true;

  } else {
    // failed payment
    await transactionService.recordTransaction({
      orderId: dbOrderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount,
      status: 'failed'
    });

    await orderService.updateOrderStatus(dbOrderId, 'Cancelled');
    return false;
  }
};