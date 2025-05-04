
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
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
            <Link to="/account" className="hover:text-primary transition-colors">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="relative hover:text-primary transition-colors">
              <Heart size={20} />
              {wishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems > 99 ? '99+' : wishlistItems}
                </span>
              )}
            </Link>
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
            <Link 
              to="/wishlist" 
              className="block font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>
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
