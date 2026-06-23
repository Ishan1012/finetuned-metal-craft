import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
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
import ReceiptPage from './pages/ReceiptPage';
import { PaymentProvider } from "./contexts/PaymentContext";
import DigitalShop from "./pages/DigitalShop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <PaymentProvider>
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
              <Route path="/digital/shop" element={<DigitalShop />} />
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

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </PaymentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
