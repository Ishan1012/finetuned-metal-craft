import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoute } from "./components/admin/AdminRoute";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
import NotFound from "./pages/NotFound";
import VerifyOtp from './pages/admin/VerifyOtp';
import { Toaster } from 'sonner';
import ManageProjects from './pages/admin/ManageProjects';
import ManageQuotes from './pages/admin/ManageQuotes';
import OrderDetails from './pages/admin/OrderDetails';
import ManageContacts from './pages/admin/ManageContacts';

function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/verify" element={<VerifyOtp />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* The 'index' route renders at exactly '/admin' */}
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="order/:id" element={<OrderDetails />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="quotes" element={<ManageQuotes />} />
              <Route path="contacts" element={<ManageContacts />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
