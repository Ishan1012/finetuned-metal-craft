import * as transactionRepository from '../repository/transactionRepository';

interface TransactionPayload {
    orderId: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
    amount: number;
    status: 'success' | 'failed';
}

export const recordTransaction = async (data: TransactionPayload) => {

    return await transactionRepository.createTransaction({
        orderId: data.orderId,
        razorpayPaymentId: data.razorpayPaymentId,
        razorpayOrderId: data.razorpayOrderId,
        razorpaySignature: data.razorpaySignature,
        amount: data.amount,
        status: data.status
    });
};

export const getTransactionsByOrder = async (orderId: string) => {
    return await transactionRepository.findTransactionsByOrderId(orderId);
};