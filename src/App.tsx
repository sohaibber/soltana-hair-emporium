import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

// Main pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";

// Protected Route Component
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

// Not found
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Admin Login Route - public */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    
                    {/* Protected Admin Routes */}
                    <Route path="/admin" element={
                      <AdminProtectedRoute>
                        <Dashboard />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/products" element={
                      <AdminProtectedRoute>
                        <Products />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/orders" element={
                      <AdminProtectedRoute>
                        <AdminOrders />
                      </AdminProtectedRoute>
                    } />
                    <Route path="/admin/users" element={
                      <AdminProtectedRoute>
                        <Users />
                      </AdminProtectedRoute>
                    } />
                    
                    {/* Catch All */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
