import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const sidebarLinks = ["Dashboard", "Products", "Orders", "Projects"];

  const handleLogout = () => {
    logout();
    window.location.href = import.meta.env.VITE_SHOP_URL || "/";
  };

  return (
    <div className="flex h-screen bg-[#FDF9F3]">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 fixed top-0 left-0 z-50 mb-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      {/* Sidebar */}
      <aside className={`
        fixed md:static z-40 w-64 h-full bg-white border-r border-[#F3E5D5] transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 border-b border-[#F3E5D5]">
          <Link to="/" className="flex items-center justify-center">
            <img src="/logo2.jpeg" alt="Logo" className="h-16 w-auto" />
          </Link>
          <h2 className="mt-4 text-xl font-bold text-center text-[#E4A143]">ASDE Laser Cutting</h2>
          <h4 className="text-md font-bold text-center">Admin Panel</h4>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((item) => (
            <Link
              key={item}
              to={item === "Dashboard" ? "/admin" : `/admin/${item.toLowerCase()}`}
              className="block px-4 py-3 rounded-xl text-neutral-700 hover:bg-[#FFF8ED] hover:text-[#D29D5B] transition-colors font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#F3E5D5]">
          <Button variant="ghost" className="w-full text-md py-5 text-white bg-[#E4A143] hover:bg-[#FFF] hover:text-[#E4A143] hover:border hover:border-[#E4A143] cursor-pointer rounded-xl" onClick={handleLogout}>
            Back to Store
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}