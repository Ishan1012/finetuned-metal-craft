import { Transaction } from '../model/Transactions';

export const createTransaction = async (transactionData: any) => {
  return await Transaction.create(transactionData);
};

export const findTransactionsByOrderId = async (orderId: string) => {
  return await Transaction.find({ orderId }).sort({ createdAt: -1 });
};

export const findTransactionByRazorpayPaymentId = async (paymentId: string) => {
  return await Transaction.findOne({ razorpayPaymentId: paymentId });
};