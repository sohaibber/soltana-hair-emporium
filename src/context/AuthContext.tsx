
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
}

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Initialize the auth state
  useEffect(() => {
    async function setupAuth() {
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            // Defer role check to prevent Supabase auth deadlocks
            setTimeout(async () => {
              await checkUserRole(currentSession.user.id);
            }, 0);
          } else {
            setIsAdmin(false);
            // Clear localStorage when user logs out
            if (event === 'SIGNED_OUT') {
              clearUserData();
            }
          }
        }
      );
      
      // THEN check for existing session
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      
      if (data.session?.user) {
        await checkUserRole(data.session.user.id);
      }
      
      setLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    }
    
    setupAuth();
  }, []);

  // Clear user-specific data from localStorage
  const clearUserData = () => {
    try {
      // Clear cart data
      localStorage.removeItem("soltanaCart");
      // Clear wishlist data
      localStorage.removeItem("soltanaWishlist");
      
      // Dispatch storage events to update contexts
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'soltanaCart',
        newValue: null,
        oldValue: localStorage.getItem("soltanaCart")
      }));
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'soltanaWishlist',
        newValue: null,
        oldValue: localStorage.getItem("soltanaWishlist")
      }));
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };
  
  // Check if user has admin role - Fixed to directly query user_roles table
  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      if (error) {
        console.error("Error checking role:", error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(data ? true : false);
    } catch (error) {
      console.error("Exception checking role:", error);
      setIsAdmin(false);
    }
  };
  
  // Sign in with email and password
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  
  // Sign up with email and password
  const register = async (formData: RegisterFormData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  
  // Sign out
  const logout = async () => {
    try {
      // Clear user data before signing out
      clearUserData();
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };
  
  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    isAdmin,
    login,
    register,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
