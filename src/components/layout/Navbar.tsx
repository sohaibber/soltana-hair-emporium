import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X, Heart, LogOut, UserCircle, Settings } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { t, isRTL } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-soltana-neutral/20 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden text-soltana-dark dark:text-white p-2 ${isRTL ? 'order-3' : 'order-1'}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className={`flex-shrink-0 ${isRTL ? 'order-1' : 'order-2'}`}>
            <Link to="/" className="flex items-center">
              <span className="font-serif font-bold text-2xl text-soltana-dark dark:text-white">
                Soltana<span className="text-primary">Hair</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex space-x-8 ${isRTL ? 'space-x-reverse order-2' : 'order-2'}`}>
            <Link to="/" className="font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/shop" className="font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors">
              {t('nav.shop')}
            </Link>
            <Link to="/about" className="font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors">
              {t('nav.contact')}
            </Link>
            {/* Admin Link - Only show for admin users */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="font-medium text-orange-600 hover:text-orange-700 transition-colors flex items-center space-x-1"
              >
                <Settings size={16} />
                <span>{t('nav.admin')}</span>
              </Link>
            )}
          </div>

          {/* Icons */}
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse order-2' : 'order-3'}`}>
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-soltana-dark dark:text-white hover:text-primary transition-colors">
                  <User size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48 bg-white dark:bg-gray-800 border shadow-lg z-50">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="flex items-center">
                        <UserCircle size={16} className={isRTL ? "ml-2" : "mr-2"} />
                        {t('nav.account')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="flex items-center">
                        <ShoppingCart size={16} className={isRTL ? "ml-2" : "mr-2"} />
                        {t('nav.orders')}
                      </Link>
                    </DropdownMenuItem>
                    {/* Admin Dashboard - Only show for admin users */}
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center text-orange-600">
                            <Settings size={16} className={isRTL ? "ml-2" : "mr-2"} />
                            {t('nav.adminDashboard')}
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut size={16} className={isRTL ? "ml-2" : "mr-2"} />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center">
                        <User size={16} className={isRTL ? "ml-2" : "mr-2"} />
                        {t('nav.login')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="flex items-center">
                        <UserCircle size={16} className={isRTL ? "ml-2" : "mr-2"} />
                        {t('nav.register')}
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist - only show count for authenticated users */}
            <Link to="/wishlist" className="relative text-soltana-dark dark:text-white hover:text-primary transition-colors">
              <Heart size={20} />
              {isAuthenticated && wishlistItems > 0 && (
                <span className={`absolute -top-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${isRTL ? '-left-2' : '-right-2'}`}>
                  {wishlistItems > 99 ? '99+' : wishlistItems}
                </span>
              )}
            </Link>

            {/* Cart - show count for all users */}
            <Link to="/cart" className="relative text-soltana-dark dark:text-white hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className={`absolute -top-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${isRTL ? '-left-2' : '-right-2'}`}>
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 animate-fade-in transition-colors">
          <div className="container mx-auto px-4 space-y-4">
            <Link 
              to="/" 
              className="block font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/shop" 
              className="block font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.shop')}
            </Link>
            <Link 
              to="/about" 
              className="block font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/contact" 
              className="block font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            {isAuthenticated && (
              <Link 
                to="/wishlist" 
                className="block font-medium text-soltana-dark dark:text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.wishlist')}
              </Link>
            )}
            {/* Admin Link for Mobile - Only show for admin users */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="block font-medium text-orange-600 hover:text-orange-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.adminDashboard')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
