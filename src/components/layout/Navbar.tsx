
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X, Search, Heart, LogOut, UserCircle, Settings } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white border-b border-soltana-neutral/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-soltana-dark p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-serif font-bold text-2xl text-soltana-dark">
                Soltana<span className="text-primary">Hair</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/shop" className="font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/about" className="font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            {/* Admin Link - Only show for admin users */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="font-medium text-orange-600 hover:text-orange-700 transition-colors flex items-center space-x-1"
              >
                <Settings size={16} />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:text-primary transition-colors">
                  <User size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="flex items-center">
                        <UserCircle size={16} className="mr-2" />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="flex items-center">
                        <ShoppingCart size={16} className="mr-2" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    {/* Admin Dashboard - Only show for admin users */}
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center text-orange-600">
                            <Settings size={16} className="mr-2" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center">
                        <User size={16} className="mr-2" />
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="flex items-center">
                        <UserCircle size={16} className="mr-2" />
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist - only show count for authenticated users */}
            <Link to="/wishlist" className="relative hover:text-primary transition-colors">
              <Heart size={20} />
              {isAuthenticated && wishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems > 99 ? '99+' : wishlistItems}
                </span>
              )}
            </Link>

            {/* Cart - show count for all users */}
            <Link to="/cart" className="relative hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 animate-fade-in">
          <div className="container mx-auto px-4 space-y-4">
            <Link 
              to="/" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated && (
              <Link 
                to="/wishlist" 
                className="block font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
            )}
            {/* Admin Link for Mobile - Only show for admin users */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="block font-medium text-orange-600 hover:text-orange-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 py-4 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                onClick={toggleSearch}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
