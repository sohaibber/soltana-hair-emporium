
import React from "react";
import { Link } from "react-router-dom";
import { User, ShoppingBag, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

interface UserSidebarProps {
  activePath: "account" | "orders" | "wishlist";
}

const UserSidebar: React.FC<UserSidebarProps> = ({ activePath }) => {
  const { logout } = useAuth();
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <nav className="space-y-2">
        <Link 
          to="/account" 
          className={`flex items-center space-x-2 p-2 rounded-md ${
            activePath === "account" ? "bg-gray-100" : "hover:bg-gray-100"
          } transition-colors`}
        >
          <User size={18} />
          <span>{t("account.details")}</span>
        </Link>
        <Link 
          to="/orders" 
          className={`flex items-center space-x-2 p-2 rounded-md ${
            activePath === "orders" ? "bg-gray-100" : "hover:bg-gray-100"
          } transition-colors`}
        >
          <ShoppingBag size={18} />
          <span>{t("nav.orders")}</span>
        </Link>
        <Link 
          to="/wishlist" 
          className={`flex items-center space-x-2 p-2 rounded-md ${
            activePath === "wishlist" ? "bg-gray-100" : "hover:bg-gray-100"
          } transition-colors`}
        >
          <Heart size={18} />
          <span>{t("nav.wishlist")}</span>
        </Link>
        <button 
          onClick={() => logout()}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors w-full text-left text-red-600"
        >
          <LogOut size={18} />
          <span>{t("nav.logout")}</span>
        </button>
      </nav>
    </div>
  );
};

export default UserSidebar;
