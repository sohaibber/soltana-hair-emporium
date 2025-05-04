
import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure auth state is updated
    const timer = setTimeout(() => {
      setChecking(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Show loading state while checking auth
  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }
  
  // Redirect if authenticated but not admin
  if (isAuthenticated && !isAdmin) {
    toast.error("You don't have permission to access the admin area");
    return <Navigate to="/" />;
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleSidebar}
          className="bg-white shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed lg:relative w-64 h-screen bg-white border-r z-50 transition-transform lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <Link to="/" className="flex items-center">
              <span className="font-serif font-bold text-xl text-soltana-dark">
                Soltana<span className="text-primary">Hair</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm ${
                        isActive
                          ? "bg-soltana-light font-medium text-soltana-dark"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex justify-between">
              <Link
                to="/"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Home className="h-4 w-4 mr-1" />
                View Store
              </Link>
              
              <button
                onClick={() => logout()}
                className="flex items-center text-sm text-red-600 hover:text-red-800"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
