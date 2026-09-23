import React from 'react';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { CheckCircle, Download, ShoppingBag, FileDown, Clock, Banknote, Building2, Truck } from 'lucide-react';

const ReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const transactionDetails = location.state;

  if (!transactionDetails) {
    return <Navigate to="/shop" replace />;
  }
  
  const digitalItems = transactionDetails.digitalItems || [];
  const isCod = transactionDetails.paymentMethod === 'cod';
  const isBankTransfer = transactionDetails.paymentMethod === 'bank_transfer';

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-8">
        
        {/* Header Section */}
        <div className="text-center">
          {isBankTransfer ? (
            <Clock className="mx-auto h-16 w-16 text-amber-500 mb-4" />
          ) : isCod ? (
            <Banknote className="mx-auto h-16 w-16 text-emerald-600 mb-4" />
          ) : (
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          )}
          
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isBankTransfer
              ? "Order Placed (Bank Transfer)"
              : isCod
              ? "Order Placed (Cash on Delivery)"
              : "Payment Successful!"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you, <strong>{transactionDetails.customerName}</strong>. Your order has been placed successfully.
          </p>
        </div>

        {/* Bank Transfer Instructions */}
        {isBankTransfer && (
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 text-sm text-amber-900 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base flex items-center gap-2 text-amber-800">
                <Building2 className="h-5 w-5" />
                Bank Transfer / UPI Instructions
              </h4>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-semibold uppercase">
                Testing Mode
              </span>
            </div>
            <p>Order registered for <strong>₹{transactionDetails.amount}</strong>. In testing mode, no real money deduction is required:</p>
            <div className="bg-white p-3 rounded-lg border border-amber-200 font-mono text-xs space-y-1 text-slate-800">
              <p><strong>Bank:</strong> State Bank of India (SBI Test)</p>
              <p><strong>Beneficiary:</strong> Agrawal & Son Daughter Enterprises</p>
              <p><strong>Test A/C No:</strong> 38920194820</p>
              <p><strong>IFSC:</strong> SBIN0001234</p>
              <p><strong>Test UPI ID:</strong> asdelaser@testupi <span className="text-gray-500 font-sans">(or test via success@razorpay)</span></p>
            </div>
            <p className="text-xs pt-1 text-amber-700">
              * Test simulation: You can confirm or update this test order status directly in your Admin Dashboard.
            </p>
          </div>
        )}

        {/* COD Notice */}
        {isCod && (
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5 text-sm text-emerald-900 space-y-1">
            <h4 className="font-bold flex items-center gap-2 text-emerald-800">
              <Banknote className="h-5 w-5" />
              Cash on Delivery (Pending Dispatch)
            </h4>
            <p className="text-xs text-emerald-700">
              Please keep <strong>₹{transactionDetails.amount}</strong> ready in cash upon physical delivery. Our team will verify your address via call/WhatsApp before dispatch.
            </p>
          </div>
        )}

        {/* Secure Digital Downloads Section */}
        {digitalItems.length > 0 && (
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <FileDown className="mr-2 h-5 w-5" />
              Your Digital Downloads
            </h3>
            <div className="space-y-3">
              {digitalItems.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg border border-blue-100">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-blue-700">
              * Please download and save your files. Links may expire.
            </p>
          </div>
        )}

        {/* Transaction Receipt Section */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-100 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">Transaction Receipt</h3>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono text-gray-900">{transactionDetails.orderId}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Reference:</span>
              <span className="font-mono text-gray-900">{transactionDetails.paymentId}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Date:</span>
              <span className="text-gray-900">{transactionDetails.date}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="text-gray-900">{transactionDetails.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment Mode:</span>
              <span className="font-medium text-gray-900 uppercase">
                {isCod ? 'Cash on Delivery' : isBankTransfer ? 'Bank Transfer' : 'Razorpay Online'}
              </span>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
              <span className="text-base font-semibold text-gray-900">Total Amount:</span>
              <span className="text-2xl font-bold text-[#d4af37]">
                ₹{transactionDetails.amount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            to={`/track-order?id=${transactionDetails.orderId}&email=${encodeURIComponent(transactionDetails.email || '')}`}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <Truck className="mr-2 h-4 w-4 text-gold" />
            Track Order
          </Link>
          
          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Print Receipt
          </button>
          
          <button
            onClick={() => navigate('/shop')}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1a1a2e] hover:bg-[#2a2a4a] focus:outline-none transition-colors"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReceiptPage;