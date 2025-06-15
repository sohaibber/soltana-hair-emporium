
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // Get redirect location from state or use default
  const from = location.state?.from?.pathname || "/account";

  // If user is already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(t("login.error") || t("login.defaultError") || "Invalid email or password. Please try again.");
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
              {t("login.title") || "Log In to Your Account"}
            </h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("login.emailLabel") || "Email Address"}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t("login.emailPlaceholder") || ""}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">{t("login.passwordLabel") || "Password"}</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    {t("login.forgotPassword") || "Forgot password?"}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={t("login.passwordPlaceholder") || ""}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-soltana-dark text-white hover:bg-black"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (t("login.loggingIn") || "Logging in...") 
                  : (t("login.submitButton") || "Log In")
                }
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">{t("login.or") || "or"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t("login.noAccount") || "Don't have an account?"}{" "}
                <Link to="/register" className="text-primary hover:underline">
                  {t("login.signupLink") || t("nav.register") || "Sign up"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
