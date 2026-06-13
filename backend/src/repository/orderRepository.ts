import { Order } from '../model/Order';

export const findAllOrders = async () => {
  // Populating the nested product references inside the items array
  return await Order.find()
    .populate('items.product')
    .sort({ createdAt: -1 });
};

export const findOrderById = async (id: string) => {
  return await Order.findById(id).populate('items.product');
};

export const createOrder = async (orderData: any) => {
  return await Order.create(orderData);
};

export const updateOrderStatus = async (id: string, status: string) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};