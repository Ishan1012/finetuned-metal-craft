// src/controller/paymentController.ts
import { Request, Response } from 'express';
import * as paymentService from '../services/paymentService';

export const checkout = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { razorpayOrder, dbOrderId } = await paymentService.createRazorpayOrder(orderData);

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      dbOrderId
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ success: false, message: "Server Error during checkout" });
  }
};

export const paymentVerification = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId, amount } = req.body;

    const result = await paymentService.verifyRazorpayPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      dbOrderId,
      amount
    );

    if (result.success) {
      res.status(200).json({ 
        success: true, 
        message: "Payment verified successfully", 
        digitalItems: result.digitalItems // Sending the decrypted URLs to the React app
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: "Invalid Signature" 
      });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error during verification" 
    });
  }
};