import { 
  findAllOrdersRepo, 
  findOrderByIdRepo, 
  createCheckoutOrderRepo, 
  updateOrderStatusRepo 
} from '../repository/orderRepository';

export const findAllOrders = async () => {
  const orders = await findAllOrdersRepo();
  if (orders) {
    return orders.map(order => {
      const plainOrder = order.toObject();
      return {
        ...plainOrder,
        date: order.createdAt.toISOString().slice(0, 10),
        createdAt: undefined
      };
    });
  }
  return [];
};

export const findOrderById = async (id: string) => {
  const order = await findOrderByIdRepo(id);

  if (!order) return null;

  const plainOrder = order.toObject();
  return {
    ...plainOrder,
    date: order.createdAt.toISOString().slice(0, 10),
    createdAt: undefined
  };
};

export const createCheckoutOrder = async (orderData: any, razorpayOrderId: string) => {
  const order = await createCheckoutOrderRepo(orderData, razorpayOrderId);

  if (!order) return null;

  const plainOrder = order.toObject();
  return {
    ...plainOrder,
    date: order.createdAt.toISOString().slice(0, 10),
    createdAt: undefined
  };
};

export const updateOrderStatus = async (id: string, status: string) => {
  const order = await updateOrderStatusRepo(id, status);

  if (!order) return null;

  const plainOrder = order.toObject();
  return {
    ...plainOrder,
    date: order.createdAt.toISOString().slice(0, 10),
    createdAt: undefined
  };
};