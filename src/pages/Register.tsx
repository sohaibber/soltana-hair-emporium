
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If user is already authenticated, redirect to account page
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!acceptTerms) {
      setError("You must accept the terms and privacy policy");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      navigate("/account");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6">
            <h1 className="font-serif text-2xl font-semibold mb-6 text-center">
              Create an Account
            </h1>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms} 
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
                />
                <label 
                  htmlFor="terms" 
                  className="text-sm text-gray-600"
                >
                  I accept the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-soltana-dark text-white hover:bg-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
