import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Order, orderAPI, productAPI } from '../../lib/api-services';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeProducts: 0,
  });
  const [loading, setLoading] = useState(true);

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
      const totalRevenue = orders.reduce((sum: number, order: Order) => {
        const amount = order.totalAmount;
        return sum + (amount || 0);
      }, 0);
      const activeProducts = products.filter((p: any) => p.status === "In Stock").length;

      setStats({
        totalOrders,
        totalRevenue,
        activeProducts,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neutral-950">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { title: "Total Orders", value: stats.totalOrders },
          { title: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}` },
          { title: "Active Products", value: stats.activeProducts },
        ].map((stat, i) => (
          <Card key={i} className="shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-none rounded-3xl p-4">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-neutral-500 uppercase tracking-wider">{stat.title}</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold text-[#D29D5B]">{loading ? '...' : stat.value}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}