
import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string | undefined;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface Translation {
  [key: string]: string;
}

interface Translations {
  [language: string]: {
    nav: {
      home: string;
      shop: string;
      about: string;
      contact: string;
      login: string;
      register: string;
      logout: string;
      account: string;
    };
    home: {
      title: string;
      subtitle: string;
      shopNow: string;
      learnMore: string;
      featuredProducts: string;
      newArrivals: string;
      bestSellers: string;
    };
    shop: {
      title: string;
      sortBy: string;
      priceLowToHigh: string;
      priceHighToLow: string;
      newest: string;
      oldest: string;
      addToCart: string;
      items: string;
    };
    product: {
      price: string;
      reviews: string;
      rating: string;
      color: string;
      length: string;
      quantity: string;
      inStock: string;
      freeShipping: string;
      returns: string;
      detailsTab: string;
      specificationsTab: string;
      reviewsTab: string;
      aboutThisProduct: string;
      customerReviews: string;
      writeReview: string;
      loginToReview: string;
      toWriteReview: string;
      loadingReviews: string;
      noReviews: string;
      notFound: string;
      notFoundDesc: string;
      viewAllProducts: string;
      youMayLike: string;
      viewMore: string;
      sale: string;
    };
    footer: {
      aboutUs: string;
      contactUs: string;
      privacyPolicy: string;
      termsOfService: string;
      copyright: string;
    };
    auth: {
      loginTitle: string;
      registerTitle: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      loginButton: string;
      registerButton: string;
      forgotPassword: string;
      resetPassword: string;
    };
    checkout: {
      title: string;
      shippingAddress: string;
      billingAddress: string;
      paymentDetails: string;
      orderSummary: string;
      placeOrder: string;
    };
    account: {
      title: string;
      profile: string;
      orders: string;
      settings: string;
      logout: string;
    };
  };
}

const translations: Translations = {
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
      login: "Login",
      register: "Register",
      logout: "Logout",
      account: "Account",
    },
    home: {
      title: "Welcome to Our Store",
      subtitle: "Discover the best products at the best prices.",
      shopNow: "Shop Now",
      learnMore: "Learn More",
      featuredProducts: "Featured Products",
      newArrivals: "New Arrivals",
      bestSellers: "Best Sellers",
    },
    shop: {
      title: "Shop",
      sortBy: "Sort By",
      priceLowToHigh: "Price: Low to High",
      priceHighToLow: "Price: High to Low",
      newest: "Newest",
      oldest: "Oldest",
      addToCart: "Add to Cart",
      items: "items",
    },
    product: {
      price: "Price",
      reviews: "Reviews",
      rating: "Reviews",
      color: "Color",
      length: "Length",
      quantity: "Quantity",
      inStock: "In Stock & Ready to Ship",
      freeShipping: "Free Shipping on Orders Over $100",
      returns: "30-Day Returns",
      detailsTab: "Product Details",
      specificationsTab: "Specifications",
      reviewsTab: "Reviews",
      aboutThisProduct: "About this Product",
      customerReviews: "Customer Reviews",
      writeReview: "Write a Review",
      loginToReview: "Please",
      toWriteReview: "to write a review.",
      loadingReviews: "Loading reviews...",
      noReviews: "No reviews yet. Be the first to review this product!",
      notFound: "Product Not Found",
      notFoundDesc: "The product you're looking for doesn't exist or has been removed.",
      viewAllProducts: "View All Products",
      youMayLike: "You May Also Like",
      viewMore: "View More Products",
      sale: "Sale"
    },
    footer: {
      aboutUs: "About Us",
      contactUs: "Contact Us",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      copyright: "© 2023 Our Store. All rights reserved.",
    },
    auth: {
      loginTitle: "Login",
      registerTitle: "Register",
      email: "Email",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
      loginButton: "Login",
      registerButton: "Register",
      forgotPassword: "Forgot Password?",
      resetPassword: "Reset Password",
    },
    checkout: {
      title: "Checkout",
      shippingAddress: "Shipping Address",
      billingAddress: "Billing Address",
      paymentDetails: "Payment Details",
      orderSummary: "Order Summary",
      placeOrder: "Place Order",
    },
    account: {
      title: "My Account",
      profile: "Profile",
      orders: "Orders",
      settings: "Settings",
      logout: "Logout",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      shop: "Boutique",
      about: "À Propos",
      contact: "Contact",
      login: "Se Connecter",
      register: "S'inscrire",
      logout: "Déconnexion",
      account: "Compte",
    },
    home: {
      title: "Bienvenue dans Notre Magasin",
      subtitle: "Découvrez les meilleurs produits aux meilleurs prix.",
      shopNow: "Achetez Maintenant",
      learnMore: "En Savoir Plus",
      featuredProducts: "Produits Phares",
      newArrivals: "Nouveaux Arrivages",
      bestSellers: "Meilleures Ventes",
    },
    shop: {
      title: "Boutique",
      sortBy: "Trier Par",
      priceLowToHigh: "Prix: Bas à Haut",
      priceHighToLow: "Prix: Haut à Bas",
      newest: "Le Plus Récent",
      oldest: "Le Plus Ancien",
      addToCart: "Ajouter au Panier",
      items: "articles",
    },
    product: {
      price: "Prix",
      reviews: "Avis",
      rating: "Avis",
      color: "Couleur",
      length: "Longueur",
      quantity: "Quantité",
      inStock: "En Stock et Prêt à Expédier",
      freeShipping: "Livraison Gratuite sur Commandes de Plus de 100$",
      returns: "Retours 30 Jours",
      detailsTab: "Détails du Produit",
      specificationsTab: "Spécifications",
      reviewsTab: "Avis",
      aboutThisProduct: "À Propos de ce Produit",
      customerReviews: "Avis des Clients",
      writeReview: "Écrire un Avis",
      loginToReview: "Veuillez",
      toWriteReview: "pour écrire un avis.",
      loadingReviews: "Chargement des avis...",
      noReviews: "Aucun avis pour le moment. Soyez le premier à évaluer ce produit!",
      notFound: "Produit Non Trouvé",
      notFoundDesc: "Le produit que vous recherchez n'existe pas ou a été supprimé.",
      viewAllProducts: "Voir Tous les Produits",
      youMayLike: "Vous Pourriez Aussi Aimer",
      viewMore: "Voir Plus de Produits",
      sale: "Solde"
    },
    footer: {
      aboutUs: "À Propos de Nous",
      contactUs: "Contactez-Nous",
      privacyPolicy: "Politique de Confidentialité",
      termsOfService: "Conditions d'Utilisation",
      copyright: "© 2023 Notre Magasin. Tous droits réservés.",
    },
    auth: {
      loginTitle: "Se Connecter",
      registerTitle: "S'inscrire",
      email: "Courriel",
      password: "Mot de Passe",
      firstName: "Prénom",
      lastName: "Nom de Famille",
      loginButton: "Se Connecter",
      registerButton: "S'inscrire",
      forgotPassword: "Mot de Passe Oublié?",
      resetPassword: "Réinitialiser le Mot de Passe",
    },
    checkout: {
      title: "Paiement",
      shippingAddress: "Adresse de Livraison",
      billingAddress: "Adresse de Facturation",
      paymentDetails: "Détails de Paiement",
      orderSummary: "Récapitulatif de la Commande",
      placeOrder: "Passer la Commande",
    },
    account: {
      title: "Mon Compte",
      profile: "Profil",
      orders: "Commandes",
      settings: "Paramètres",
      logout: "Déconnexion",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      shop: "المتجر",
      about: "حول",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      register: "تسجيل",
      logout: "تسجيل الخروج",
      account: "الحساب",
    },
    home: {
      title: "مرحباً بكم في متجرنا",
      subtitle: "اكتشف أفضل المنتجات بأفضل الأسعار.",
      shopNow: "تسوق الآن",
      learnMore: "اعرف المزيد",
      featuredProducts: "المنتجات المميزة",
      newArrivals: "الوافدين الجدد",
      bestSellers: "الأكثر مبيعاً",
    },
    shop: {
      title: "المتجر",
      sortBy: "رتب حسب",
      priceLowToHigh: "السعر: من الأقل إلى الأعلى",
      priceHighToLow: "السعر: من الأعلى إلى الأقل",
      newest: "الأحدث",
      oldest: "الأقدم",
      addToCart: "أضف إلى السلة",
      items: "العناصر",
    },
    product: {
      price: "السعر",
      reviews: "التقييمات",
      rating: "التقييمات",
      color: "اللون",
      length: "الطول",
      quantity: "الكمية",
      inStock: "متوفر وجاهز للشحن",
      freeShipping: "شحن مجاني للطلبات فوق 100 دولار",
      returns: "إرجاع خلال 30 يوماً",
      detailsTab: "تفاصيل المنتج",
      specificationsTab: "المواصفات",
      reviewsTab: "التقييمات",
      aboutThisProduct: "حول هذا المنتج",
      customerReviews: "تقييمات العملاء",
      writeReview: "اكتب تقييماً",
      loginToReview: "يرجى",
      toWriteReview: "لكتابة تقييم.",
      loadingReviews: "جاري تحميل التقييمات...",
      noReviews: "لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج!",
      notFound: "المنتج غير موجود",
      notFoundDesc: "المنتج الذي تبحث عنه غير موجود أو تم حذفه.",
      viewAllProducts: "عرض جميع المنتجات",
      youMayLike: "قد يعجبك أيضاً",
      viewMore: "عرض المزيد من المنتجات",
      sale: "تخفيض"
    },
    footer: {
      aboutUs: "معلومات عنا",
      contactUs: "اتصل بنا",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      copyright: "حقوق الطبع والنشر © 2023 متجرنا. جميع الحقوق محفوظة.",
    },
    auth: {
      loginTitle: "تسجيل الدخول",
      registerTitle: "تسجيل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      loginButton: "تسجيل الدخول",
      registerButton: "تسجيل",
      forgotPassword: "هل نسيت كلمة المرور؟",
      resetPassword: "إعادة تعيين كلمة المرور",
    },
    checkout: {
      title: "الدفع",
      shippingAddress: "عنوان الشحن",
      billingAddress: "عنوان الفاتورة",
      paymentDetails: "تفاصيل الدفع",
      orderSummary: "ملخص الطلب",
      placeOrder: "إتمام الطلب",
    },
    account: {
      title: "حسابي",
      profile: "الملف الشخصي",
      orders: "الطلبات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
    },
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  const t = useCallback((key: string): string | undefined => {
    const keys = key.split('.');
    let translation: any = translations[language];
    for (const k of keys) {
      translation = translation?.[k];
      if (translation === undefined) {
        return undefined;
      }
    }
    return translation;
  }, [language]);

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
