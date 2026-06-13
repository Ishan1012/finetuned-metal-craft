import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderAPI, productAPI } from '@/lib/api-services';
import { useToast } from '@/components/ui/use-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const [orders, products] = await Promise.all([
        orderAPI.getOrders(),
        productAPI.getProducts(),
      ]);

      // Calculate statistics
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => {
        const amount = typeof order.total === 'string' 
          ? parseFloat(order.total.replace(/[^0-9.-]+/g, ''))
          : order.total;
        return sum + (amount || 0);
      }, 0);
      const activeProducts = products.filter(p => p.inStock).length;

      setStats({
        totalOrders,
        totalRevenue,
        activeProducts,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard statistics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? 'Loading...' : stats.totalOrders}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? 'Loading...' : `₹${stats.totalRevenue.toLocaleString()}`}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? 'Loading...' : stats.activeProducts}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}