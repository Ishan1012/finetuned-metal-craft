import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { orderAPI, Order } from "../../lib/api-services";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { toast } from "sonner";
import { ArrowLeft, Package, User, MapPin, Receipt } from "lucide-react"; // Assuming you use lucide-react for icons

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await orderAPI.getOrderById(id as string);
      setOrder(data);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: any) => {
    if (!order) return;
    try {
      setUpdating(true);
      
      // Optimistic UI update
      setOrder({ ...order, status: newStatus });
      
      await orderAPI.updateOrderStatus(order._id, newStatus);
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
      // Revert on failure
      await fetchOrderDetails();
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500 text-lg">Loading order details...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Order not found</h2>
        <Button onClick={() => navigate('/admin/orders')} variant="outline">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Order Details</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm text-gray-500">Update Status:</span>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value as any)}
            disabled={updating}
            className="border-gray-200 border rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E4A143] disabled:opacity-50"
          >
            <option value="Paid">Paid</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Order Info & Items */}
        <div className="md:col-span-2 space-y-6">
          
          {/* General Order Information Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-[#E4A143]" />
              Order Summary
            </h2>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-gray-500">Order ID</p>
                <p className="font-medium">{order._id}</p>
              </div>
              <div>
                <p className="text-gray-500">Razorpay ID</p>
                <p className="font-medium">{order.razorpayOrderId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Order Date</p>
                <p className="font-medium">{new Date(order.date).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Current Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Items Table Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-6 overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Receipt className="h-5 w-5 text-[#E4A143]" />
              Purchased Items
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Assuming order.items exists. Adjust if your API returns a different structure */}
                {order.items && order.items.length > 0 ? (
                  order.items.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.name || item.product?.name || "Unknown Product"}
                      </TableCell>
                      <TableCell className="text-center">{item.quantity || 1}</TableCell>
                      <TableCell className="text-right">₹ {Number(item.price).toLocaleString()}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹ {(Number(item.price) * Number(item.quantity || 1)).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                      No line items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹ {order.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹ {order.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Customer Info */}
        <div className="space-y-6">
          
          {/* Customer Details Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-[#E4A143]" />
              Customer Details
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              {/* Add these if they exist in your Order schema */}
              <div>
                <p className="text-gray-500">Email Address</p>
                <p className="font-medium">{order.email || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone Number</p>
                <p className="font-medium">{order.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Shipping Info Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#E4A143]" />
              Shipping Address
            </h2>
            {order.shippingAddress ? (
              <div className="text-sm space-y-1 text-gray-700">
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                <p>{order.shippingAddress.pinCode}</p>
                <p>India</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No shipping details provided (Digital Product?)</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}