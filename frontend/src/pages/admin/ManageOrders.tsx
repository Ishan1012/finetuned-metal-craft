import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { orderAPI, Order } from "@/lib/api-services";
import { useToast } from "@/components/ui/use-toast";

export default function ManageOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

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
      toast({
        title: 'Error',
        description: 'Failed to load orders',
        variant: 'destructive',
      });
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

      toast({
        title: 'Success',
        description: 'Order status updated successfully',
      });
    } catch (error) {
      console.error('Failed to update order status:', error);
      
      // Revert the optimistic update on error
      await fetchOrders();
      
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
        <Button disabled>Add New Order</Button>
      </div>
      <div className="bg-white rounded-md shadow border">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updating === order._id}
                      className="border-gray-200 border rounded-md px-2 py-1 text-sm bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Created">Created</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}