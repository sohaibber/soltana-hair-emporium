
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@soltanahair.com",
    isAdmin: true,
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    isAdmin: false,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("soltanaUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === "password") {
      // In a real app, we would verify the password properly
      setUser(foundUser);
      localStorage.setItem("soltanaUser", JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }
    
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === email)) {
      toast.error("Email already in use");
      throw new Error("Email already in use");
    }
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      isAdmin: false,
    };
    
    // In a real app, we would save the user to a database
    mockUsers.push(newUser);
    
    setUser(newUser);
    localStorage.setItem("soltanaUser", JSON.stringify(newUser));
    toast.success("Registration successful!");
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("soltanaUser");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
