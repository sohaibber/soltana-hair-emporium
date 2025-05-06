
import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If the user is authenticated but not an admin, show an error message
    if (isAuthenticated && !isAdmin && !loading) {
      toast.error("Access denied. You must be an admin to view this page.");
    }
  }, [isAuthenticated, isAdmin, loading]);
  
  // While authentication state is loading, don't render anything yet
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If not authenticated at all, redirect to admin login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // If authenticated but not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // If the user is authenticated and has admin role, render the children
  return <>{children}</>;
};

export default AdminProtectedRoute;
