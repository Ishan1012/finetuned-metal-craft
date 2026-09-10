import { Order } from '../model/Order';
import { Product } from '../model/Product';
import mongoose from 'mongoose';

// Safely attach product details if the product ID is a valid MongoDB ObjectId
const attachProducts = async (orders: any[]) => {
  if (!orders || orders.length === 0) return orders;

  const validIds: any[] = [];
  for (const order of orders) {
    if (order && order.items) {
      for (const item of order.items) {
        if (item && item.product && mongoose.isValidObjectId(item.product)) {
          validIds.push(item.product);
        }
      }
    }
  }

  if (validIds.length === 0) return orders;

  try {
    const dbProducts = await Product.find({ _id: { $in: validIds } }).lean();
    const productMap = new Map(dbProducts.map((p: any) => [p._id.toString(), p]));

    for (const order of orders) {
      if (order && order.items) {
        for (const item of order.items) {
          if (item && item.product && mongoose.isValidObjectId(item.product)) {
            const found = productMap.get(item.product.toString());
            if (found) {
              item.product = found;
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('[OrderRepository] Notice: could not enrich products:', err);
  }

  return orders;
};

const attachSingleOrder = async (order: any) => {
  if (!order) return null;
  const [enriched] = await attachProducts([order]);
  return enriched;
};

export const findAllOrdersRepo = async () => {
  const orders = await Order.find().sort({ createdAt: -1 });
  return await attachProducts(orders);
};

export const findOrderByIdRepo = async (id: string) => {
  let order: any = null;
  if (mongoose.isValidObjectId(id)) {
    order = await Order.findById(id);
    if (order) return await attachSingleOrder(order);
  }
  order = await Order.findOne({ razorpayOrderId: id });
  return await attachSingleOrder(order);
};

export const createCheckoutOrderRepo = async (orderData: any, razorpayOrderId?: string) => {
  const payload = razorpayOrderId ? { ...orderData, razorpayOrderId } : orderData;
  const created = await Order.create(payload);
  return await attachSingleOrder(created);
};

export const updateOrderStatusRepo = async (id: string, status: string, additionalFields?: Record<string, any>) => {
  let order: any = null;
  if (!mongoose.isValidObjectId(id)) {
    order = await Order.findOneAndUpdate(
      { razorpayOrderId: id },
      { status, ...(additionalFields || {}) },
      { new: true }
    );
  } else {
    order = await Order.findByIdAndUpdate(
      id,
      { status, ...(additionalFields || {}) },
      { new: true }
    );
  }
  return await attachSingleOrder(order);
};