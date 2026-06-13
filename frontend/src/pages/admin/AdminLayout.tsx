import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/shop");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center">
            <img
              src="/logo3.png"
              alt="Finetuned Metal Craft Logo"
              className="h-[10vh] w-auto object-contain shrink-0"
            />
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-100">Dashboard</Link>
          <Link to="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-100">Products</Link>
          <Link to="/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-100">Orders</Link>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Back to Store
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}