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
    language: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      shopNow: string;
      ourStory: string;
    };
    featuredProducts: string;
    whyChooseUs: {
      title: string;
    };
  };
  product: {
    addToCart: string;
    addToWishlist: string;
    description: string;
    details: string;
    reviews: string;
    youMayLike: string;
    viewMore: string;
    viewAllProducts: string;
    noProducts: string;
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
  shop: {
    filters: string;
  };
  footer: {
    aboutUs: string;
    contactUs: string;
    followUs: string;
    brand: {
      description: string;
    };
    shop: string;
    allProducts: string;
    clipIns: string;
    tapeIns: string;
    ponytails: string;
    wigs: string;
    company: string;
    contact: string;
    careers: string;
    press: string;
    help: string;
    shipping: string;
    returns: string;
    faq: string;
    privacyPolicy: string;
    terms: string;
    copyright: string;
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
      language: "Language",
    },
    home: {
      hero: {
        title: "Transform Your Look",
        subtitle: "Beautiful Hair",
        description: "Premium quality hair extensions that blend seamlessly with your natural hair. Experience luxury and confidence with every strand.",
        shopNow: "Shop Now",
        ourStory: "Our Story",
      },
      featuredProducts: "Featured Products",
      whyChooseUs: {
        title: "Why Choose Us",
      },
    },
    product: {
      addToCart: "Add to Cart",
      addToWishlist: "Add to Wishlist",
      description: "Description",
      details: "Details",
      reviews: "Reviews",
      youMayLike: "You May Also Like",
      viewMore: "View More",
      viewAllProducts: "View All Products",
      noProducts: "No products available at the moment.",
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
    shop: {
      filters: "Filters",
    },
    footer: {
      aboutUs: "About Us",
      contactUs: "Contact Us",
      followUs: "Follow Us",
      brand: {
        description: "Premium hair extensions and wigs for the modern woman. Transform your look with our luxury collection.",
      },
      shop: "Shop",
      allProducts: "All Products",
      clipIns: "Clip-in Extensions",
      tapeIns: "Tape-in Extensions",
      ponytails: "Ponytail Extensions",
      wigs: "Luxury Wigs",
      company: "Company",
      contact: "Contact",
      careers: "Careers",
      press: "Press",
      help: "Help",
      shipping: "Shipping & Returns",
      returns: "Returns",
      faq: "FAQ",
      privacyPolicy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "All rights reserved.",
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
      language: "Langue",
    },
    home: {
      hero: {
        title: "Transformez Votre Look",
        subtitle: "Beaux Cheveux",
        description: "Extensions de cheveux de qualité premium qui se fondent parfaitement avec vos cheveux naturels. Découvrez le luxe et la confiance à chaque mèche.",
        shopNow: "Acheter Maintenant",
        ourStory: "Notre Histoire",
      },
      featuredProducts: "Produits Vedettes",
      whyChooseUs: {
        title: "Pourquoi Nous Choisir",
      },
    },
    product: {
      addToCart: "Ajouter au panier",
      addToWishlist: "Ajouter à la liste de souhaits",
      description: "Description",
      details: "Détails",
      reviews: "Avis",
      youMayLike: "Vous Pourriez Aussi Aimer",
      viewMore: "Voir Plus",
      viewAllProducts: "Voir Tous les Produits",
      noProducts: "Aucun produit disponible pour le moment.",
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
    shop: {
      filters: "Filtres",
    },
    footer: {
      aboutUs: "À Propos de Nous",
      contactUs: "Contactez-Nous",
      followUs: "Suivez-Nous",
      brand: {
        description: "Extensions de cheveux et perruques premium pour la femme moderne. Transformez votre look avec notre collection de luxe.",
      },
      shop: "Boutique",
      allProducts: "Tous les Produits",
      clipIns: "Extensions à Clips",
      tapeIns: "Extensions à Bandes",
      ponytails: "Extensions Queue de Cheval",
      wigs: "Perruques de Luxe",
      company: "Entreprise",
      contact: "Contact",
      careers: "Carrières",
      press: "Presse",
      help: "Aide",
      shipping: "Livraison et Retours",
      returns: "Retours",
      faq: "FAQ",
      privacyPolicy: "Politique de Confidentialité",
      terms: "Conditions de Service",
      copyright: "Tous droits réservés.",
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
      language: "اللغة",
    },
    home: {
      hero: {
        title: "اكتشفي إطلالتك الجديدة",
        subtitle: "شعر جميل",
        description: "وصلات شعر عالية الجودة تمتزج بسلاسة مع شعرك الطبيعي. اختبري الفخامة والثقة مع كل خصلة.",
        shopNow: "تسوقي الآن",
        ourStory: "قصتنا",
      },
      featuredProducts: "المنتجات المميزة",
      whyChooseUs: {
        title: "لماذا تختارينا",
      },
    },
    product: {
      addToCart: "أضف إلى السلة",
      addToWishlist: "أضف إلى قائمة الرغبات",
      description: "الوصف",
      details: "التفاصيل",
      reviews: "المراجعات",
      youMayLike: "قد يعجبك أيضاً",
      viewMore: "عرض المزيد",
      viewAllProducts: "عرض جميع المنتجات",
      noProducts: "لا توجد منتجات متاحة في الوقت الحالي.",
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
    shop: {
      filters: "المرشحات",
    },
    footer: {
      aboutUs: "معلومات عنا",
      contactUs: "اتصل بنا",
      followUs: "تابعنا",
      brand: {
        description: "وصلات شعر وشعر مستعار عالي الجودة للمرأة العصرية. اكتشفي إطلالتك الجديدة مع مجموعتنا الفاخرة.",
      },
      shop: "المتجر",
      allProducts: "جميع المنتجات",
      clipIns: "وصلات الكليب",
      tapeIns: "وصلات الشريط",
      ponytails: "وصلات ذيل الحصان",
      wigs: "شعر مستعار فاخر",
      company: "الشركة",
      contact: "اتصل بنا",
      careers: "الوظائف",
      press: "الصحافة",
      help: "المساعدة",
      shipping: "الشحن والإرجاع",
      returns: "الإرجاع",
      faq: "الأسئلة الشائعة",
      privacyPolicy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      copyright: "جميع الحقوق محفوظة.",
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
