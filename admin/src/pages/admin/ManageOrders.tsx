// import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useState, useEffect } from "react";
import { orderAPI, Order } from "../../lib/api-services";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

export default function ManageOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await orderAPI.getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(orderId);

      // Optimistic update - update UI immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus as any } : order
        )
      );

      // Call backend API to save the change
      await orderAPI.updateOrderStatus(orderId, newStatus);

      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Failed to update order status:', error);

      // Revert the optimistic update on error
      await fetchOrders();

      toast.error('Failed to update order status');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
        {/* <Button className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl" disabled>Add New Order</Button> */}
      </div>
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-none p-6 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No orders found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>More Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.razorpayOrderId.slice(6)}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.date.slice(0, 10)}</TableCell>
                  <TableCell>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updating === order._id}
                      className="border-gray-200 border rounded-md px-2 py-1 text-sm bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell>₹ {order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Link to={`/admin/order/${order._id}`}>
                      <Button
                        className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl cursor-pointer"
                        size="sm"
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}