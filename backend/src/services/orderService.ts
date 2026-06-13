import * as orderRepository from '../repository/orderRepository';

export const createCheckoutOrder = async (orderData: any, razorpayOrderId: string) => {
    const formattedOrder = {
        customerName: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        shippingAddress: orderData.shippingAddress,
        items: orderData.items,
        subtotal: orderData.subtotal,
        shippingFee: orderData.shippingFee,
        totalAmount: orderData.totalAmount,
        razorpayOrderId: razorpayOrderId,
        status: 'Created' // Default status 
    };

    return await orderRepository.createOrder(formattedOrder);
};

export const getAllOrders = async () => {
    return await orderRepository.findAllOrders();
};

export const getOrderById = async (id: string) => {
    return await orderRepository.findOrderById(id);
};

export const updateOrderStatus = async (id: string, status: string) => {
    return await orderRepository.updateOrderStatus(id, status);
};
