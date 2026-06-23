import { Order } from '../model/Order';

export const findAllOrdersRepo = async () => {
  return await Order.find().populate('items.product').sort({ createdAt: -1 });
};

export const findOrderByIdRepo = async (id: string) => {
  return await Order.findById(id).populate('items.product');
};

export const createCheckoutOrderRepo = async (orderData: any, razorpayOrderId: string) => {
  return await Order.create({ ...orderData, razorpayOrderId });
};

export const updateOrderStatusRepo = async (id: string, status: string) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};