
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect location from query params or use default
  const from = location.state?.from?.pathname || "/admin";
  
  // If user is already authenticated and an admin, redirect
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate(from);
    }
  }, [isAuthenticated, isAdmin, navigate, from]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      
      // We need to wait briefly for the admin status to be checked after login
      setTimeout(() => {
        if (isAuthenticated && !isAdmin) {
          setError("Access denied. You don't have admin privileges.");
          setIsSubmitting(false);
          return;
        }
      }, 1000);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="font-serif font-bold text-2xl text-soltana-dark">
              Soltana<span className="text-primary">Hair</span>
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-600">
            Log in to access the admin dashboard
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@soltanahair.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-soltana-dark text-white hover:bg-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
        
        <div className="mt-8 text-center text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
