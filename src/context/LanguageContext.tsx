import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'ar';

export interface Translations {
  nav: {
    home: string;
    shop: string;
    about: string;
    contact: string;
    login: string;
    register: string;
    logout: string;
    account: string;
    orders: string;
    wishlist: string;
    admin: string;
    adminDashboard: string;
  };
  common: {
    search: string;
    noProductsFound: string;
  };
  product: {
    addToCart: string;
    addToWishlist: string;
    description: string;
    details: string;
    reviews: string;
  };
  cart: {
    title: string;
    empty: string;
    update: string;
    remove: string;
    checkout: string;
    total: string;
  };
  checkout: {
    title: string;
    shippingAddress: string;
    billingAddress: string;
    paymentDetails: string;
    confirmOrder: string;
  };
  footer: {
    aboutUs: string;
    contactUs: string;
    followUs: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
      login: "Login",
      register: "Register",
      logout: "Logout",
      account: "My Account",
      orders: "My Orders",
      wishlist: "Wishlist",
      admin: "Admin",
      adminDashboard: "Admin Dashboard",
    },
    common: {
      search: "Search",
      noProductsFound: "No products found.",
    },
    product: {
      addToCart: "Add to Cart",
      addToWishlist: "Add to Wishlist",
      description: "Description",
      details: "Details",
      reviews: "Reviews",
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty.",
      update: "Update",
      remove: "Remove",
      checkout: "Checkout",
      total: "Total:",
    },
    checkout: {
      title: "Checkout",
      shippingAddress: "Shipping Address",
      billingAddress: "Billing Address",
      paymentDetails: "Payment Details",
      confirmOrder: "Confirm Order",
    },
    footer: {
      aboutUs: "About Us",
      contactUs: "Contact Us",
      followUs: "Follow Us",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      shop: "Boutique",
      about: "À Propos",
      contact: "Contact",
      login: "Se Connecter",
      register: "S'Inscrire",
      logout: "Se Déconnecter",
      account: "Mon Compte",
      orders: "Mes Commandes",
      wishlist: "Liste de Souhaits",
      admin: "Admin",
      adminDashboard: "Tableau de Bord Admin",
    },
    common: {
      search: "Rechercher",
      noProductsFound: "Aucun produit trouvé.",
    },
    product: {
      addToCart: "Ajouter au panier",
      addToWishlist: "Ajouter à la liste de souhaits",
      description: "Description",
      details: "Détails",
      reviews: "Avis",
    },
    cart: {
      title: "Panier",
      empty: "Votre panier est vide.",
      update: "Mettre à jour",
      remove: "Supprimer",
      checkout: "Commander",
      total: "Total:",
    },
    checkout: {
      title: "Commander",
      shippingAddress: "Adresse de livraison",
      billingAddress: "Adresse de facturation",
      paymentDetails: "Détails de paiement",
      confirmOrder: "Confirmer la commande",
    },
    footer: {
      aboutUs: "À Propos de Nous",
      contactUs: "Contactez-Nous",
      followUs: "Suivez-Nous",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      shop: "المتجر",
      about: "معلومات عنا",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      account: "حسابي",
      orders: "طلباتي",
      wishlist: "قائمة الرغبات",
      admin: "الإدارة",
      adminDashboard: "لوحة تحكم الإدارة",
    },
    common: {
      search: "بحث",
      noProductsFound: "لم يتم العثور على منتجات.",
    },
    product: {
      addToCart: "أضف إلى السلة",
      addToWishlist: "أضف إلى قائمة الرغبات",
      description: "الوصف",
      details: "التفاصيل",
      reviews: "المراجعات",
    },
    cart: {
      title: "سلة التسوق",
      empty: "سلتك فارغة.",
      update: "تحديث",
      remove: "إزالة",
      checkout: "الدفع",
      total: "المجموع:",
    },
    checkout: {
      title: "الدفع",
      shippingAddress: "عنوان الشحن",
      billingAddress: "عنوان الفاتورة",
      paymentDetails: "تفاصيل الدفع",
      confirmOrder: "تأكيد الطلب",
    },
    footer: {
      aboutUs: "معلومات عنا",
      contactUs: "اتصل بنا",
      followUs: "تابعنا",
    },
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>((localStorage.getItem('language') as Language) || 'en');
  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [language, isRTL]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found in ${language}`);
        return key;
      }
    }
    return value || key;
  };

  const value: LanguageContextProps = {
    language,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
