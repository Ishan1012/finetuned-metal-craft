import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminRoute } from "@/components/admin/AdminRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import ShopDetail from "./pages/ShopDetail";
import Checkout from "./pages/Checkout";
import YourProject from "./pages/YourProject";
import Railings from "./pages/products/Railings";
import NamePlates from "./pages/products/NamePlates";
import Elevation from "./pages/products/Elevation";
import Gates from "./pages/products/Gates";
import Dividers from "./pages/products/Dividers";
import CustomCutting from "./pages/products/CustomCutting";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import ReceiptPage from './pages/ReceiptPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <CartProvider>
            <Toaster />
            <Sonner />
            <CartDrawer />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/products" element={<Products />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ShopDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/your-project" element={<YourProject />} />
              <Route path="/products/railings" element={<Railings />} />
              <Route path="/products/nameplates" element={<NamePlates />} />
              <Route path="/products/elevation" element={<Elevation />} />
              <Route path="/products/gates" element={<Gates />} />
              <Route path="/products/dividers" element={<Dividers />} />
              <Route path="/products/custom" element={<CustomCutting />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/receipt" element={<ReceiptPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  {/* The 'index' route renders at exactly '/admin' */}
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<ManageProducts />} />
                  <Route path="orders" element={<ManageOrders />} />
                </Route>
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
