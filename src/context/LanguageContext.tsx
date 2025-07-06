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
      titleHighlight: string;
      subtitle: string;
      premiumQuality: {
        title: string;
        description: string;
      };
      ethicallySourced: {
        title: string;
        description: string;
      };
      expertCraftsmanship: {
        title: string;
        description: string;
      };
      fastShipping: {
        title: string;
        description: string;
      };
      colorPerfection: {
        title: string;
        description: string;
      };
      expertSupport: {
        title: string;
        description: string;
      };
      cta: {
        title: string;
        description: string;
        shopExtensions: string;
        learnMore: string;
      };
    };
    testimonials: {
      title: string;
      subtitle: string;
    };
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      subscribe: string;
      subscribing: string;
      success: string;
    };
  };
  instagram: {
    followUs: string;
    handle: string;
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
    price: string;
    color: string;
    length: string;
    quantity: string;
    inStock: string;
    freeShipping: string;
    returns: string;
    notFound: string;
    notFoundDesc: string;
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
    rating: string;
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
    title: string;
    filter: string;
    filterProducts: string;
    applyFilters: string;
    gridView: string;
    listView: string;
    noProductsFound: string;
    tryAdjustingFilters: string;
    addToCart: string;
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
        title: "Why Choose",
        titleHighlight: "SoltanaHair",
        subtitle: "Discover what makes our hair extensions stand out from the rest. Quality, ethics, and customer satisfaction are at the heart of everything we do.",
        premiumQuality: {
          title: "Premium Quality",
          description: "100% human hair extensions that look and feel completely natural. Ethically sourced and professionally processed for maximum durability."
        },
        ethicallySourced: {
          title: "Ethically Sourced",
          description: "We work directly with suppliers who maintain the highest ethical standards, ensuring fair treatment and compensation throughout our supply chain."
        },
        expertCraftsmanship: {
          title: "Expert Craftsmanship",
          description: "Each piece is carefully crafted by skilled artisans with years of experience, ensuring consistent quality and perfect finishing."
        },
        fastShipping: {
          title: "Fast Shipping",
          description: "Get your extensions quickly with our expedited shipping options. Most orders are processed and shipped within 24-48 hours."
        },
        colorPerfection: {
          title: "Color Perfection",
          description: "Our advanced color-matching technology ensures your extensions blend perfectly with your natural hair color."
        },
        expertSupport: {
          title: "Expert Support",
          description: "Our hair extension experts are here to help you choose the perfect match and provide styling tips for the best results."
        },
        cta: {
          title: "Ready to Transform Your Look?",
          description: "Join thousands of satisfied customers who have discovered the perfect hair extensions for their lifestyle.",
          shopExtensions: "Shop Extensions",
          learnMore: "Learn More"
        }
      },
      testimonials: {
        title: "What Our Customers Say",
        subtitle: "Don't just take our word for it - hear from the women who have transformed their looks with SoltanaHair extensions."
      },
      newsletter: {
        title: "Stay Updated",
        description: "Subscribe to get exclusive offers, styling tips, and be the first to know about new arrivals.",
        placeholder: "Enter your email address",
        subscribe: "Subscribe",
        subscribing: "Subscribing...",
        success: "Thank you for subscribing! You'll receive exclusive offers and styling tips."
      }
    },
    instagram: {
      followUs: "Follow Us on Instagram",
      handle: "@soltanahair"
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
      price: "Price",
      color: "Color",
      length: "Length",
      quantity: "Quantity",
      inStock: "In Stock & Ready to Ship",
      freeShipping: "Free Shipping on Orders Over $100",
      returns: "30-Day Returns",
      notFound: "Product Not Found",
      notFoundDesc: "The product you're looking for doesn't exist or has been removed.",
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
      rating: "Reviews",
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
      title: "Shop",
      filter: "Filter",
      filterProducts: "Filter Products",
      applyFilters: "Apply Filters",
      gridView: "Grid View",
      listView: "List View",
      noProductsFound: "No products found",
      tryAdjustingFilters: "Try adjusting your filters to see more results.",
      addToCart: "Add to Cart",
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
        title: "Pourquoi Choisir",
        titleHighlight: "SoltanaHair",
        subtitle: "Découvrez ce qui rend nos extensions de cheveux uniques. La qualité, l'éthique et la satisfaction client sont au cœur de tout ce que nous faisons.",
        premiumQuality: {
          title: "Qualité Premium",
          description: "Extensions de cheveux 100% humains qui paraissent et se sentent complètement naturelles. Sourcées éthiquement et traitées professionnellement pour une durabilité maximale."
        },
        ethicallySourced: {
          title: "Sourcées Éthiquement",
          description: "Nous travaillons directement avec des fournisseurs qui maintiennent les plus hauts standards éthiques, garantissant un traitement équitable tout au long de notre chaîne d'approvisionnement."
        },
        expertCraftsmanship: {
          title: "Artisanat Expert",
          description: "Chaque pièce est soigneusement fabriquée par des artisans qualifiés avec des années d'expérience, garantissant une qualité constante et une finition parfaite."
        },
        fastShipping: {
          title: "Livraison Rapide",
          description: "Obtenez vos extensions rapidement avec nos options de livraison express. La plupart des commandes sont traitées et expédiées dans les 24-48 heures."
        },
        colorPerfection: {
          title: "Perfection des Couleurs",
          description: "Notre technologie avancée de correspondance des couleurs garantit que vos extensions se fondent parfaitement avec votre couleur de cheveux naturelle."
        },
        expertSupport: {
          title: "Support Expert",
          description: "Nos experts en extensions de cheveux sont là pour vous aider à choisir la correspondance parfaite et fournir des conseils de coiffure pour les meilleurs résultats."
        },
        cta: {
          title: "Prête à Transformer Votre Look?",
          description: "Rejoignez des milliers de clientes satisfaites qui ont découvert les extensions de cheveux parfaites pour leur style de vie.",
          shopExtensions: "Acheter Extensions",
          learnMore: "En Savoir Plus"
        }
      },
      testimonials: {
        title: "Ce Que Disent Nos Clientes",
        subtitle: "Ne nous croyez pas sur parole - écoutez les femmes qui ont transformé leur look avec les extensions SoltanaHair."
      },
      newsletter: {
        title: "Restez Informée",
        description: "Abonnez-vous pour recevoir des offres exclusives, des conseils de coiffure et être la première à connaître les nouvelles arrivées.",
        placeholder: "Entrez votre adresse email",
        subscribe: "S'abonner",
        subscribing: "Abonnement en cours...",
        success: "Merci de vous être abonnée! Vous recevrez des offres exclusives et des conseils de coiffure."
      }
    },
    instagram: {
      followUs: "Suivez-nous sur Instagram",
      handle: "@soltanahair"
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
      price: "Prix",
      color: "Couleur",
      length: "Longueur",
      quantity: "Quantité",
      inStock: "En Stock & Prêt à Expédier",
      freeShipping: "Livraison Gratuite sur Commandes Plus de 100$",
      returns: "Retours 30 Jours",
      notFound: "Produit Non Trouvé",
      notFoundDesc: "Le produit que vous cherchez n'existe pas ou a été supprimé.",
      detailsTab: "Détails du Produit",
      specificationsTab: "Spécifications",
      reviewsTab: "Avis",
      aboutThisProduct: "À Propos de ce Produit",
      customerReviews: "Avis des Clientes",
      writeReview: "Écrire un Avis",
      loginToReview: "Veuillez",
      toWriteReview: "pour écrire un avis.",
      loadingReviews: "Chargement des avis...",
      noReviews: "Aucun avis pour le moment. Soyez la première à évaluer ce produit!",
      rating: "Avis",
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
      title: "Boutique",
      filter: "Filtre",
      filterProducts: "Filtrer les Produits",
      applyFilters: "Appliquer les Filtres",
      gridView: "Vue Grille",
      listView: "Vue Liste",
      noProductsFound: "Aucun produit trouvé",
      tryAdjustingFilters: "Essayez d'ajuster vos filtres pour voir plus de résultats.",
      addToCart: "Ajouter au Panier",
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
        title: "لماذا تختارين",
        titleHighlight: "سلطانة هير",
        subtitle: "اكتشفي ما يجعل وصلات الشعر لدينا مميزة. الجودة والأخلاق ورضا العملاء هي في قلب كل ما نقوم به.",
        premiumQuality: {
          title: "جودة عالية",
          description: "وصلات شعر بشري 100% تبدو وتشعر طبيعية تماماً. مصدرة أخلاقياً ومعالجة مهنياً لأقصى درجات المتانة."
        },
        ethicallySourced: {
          title: "مصدرة أخلاقياً",
          description: "نعمل مباشرة مع موردين يحافظون على أعلى المعايير الأخلاقية، مما يضمن المعاملة العادلة والتعويض في جميع أنحاء سلسلة التوريد."
        },
        expertCraftsmanship: {
          title: "حرفية خبيرة",
          description: "كل قطعة مصنوعة بعناية من قبل حرفيين ماهرين بسنوات من الخبرة، مما يضمن الجودة المستمرة والتشطيب المثالي."
        },
        fastShipping: {
          title: "شحن سريع",
          description: "احصلي على وصلاتك بسرعة مع خيارات الشحن السريع لدينا. معظم الطلبات تتم معالجتها وشحنها خلال 24-48 ساعة."
        },
        colorPerfection: {
          title: "مطابقة الألوان المثالية",
          description: "تقنيتنا المتقدمة لمطابقة الألوان تضمن امتزاج وصلاتك بشكل مثالي مع لون شعرك الطبيعي."
        },
        expertSupport: {
          title: "دعم خبير",
          description: "خبراء وصلات الشعر لدينا هنا لمساعدتك في اختيار المطابقة المثالية وتقديم نصائح التصفيف للحصول على أفضل النتائج."
        },
        cta: {
          title: "هل أنت مستعدة لتغيير إطلالتك؟",
          description: "انضمي إلى آلاف العميلات الراضيات اللواتي اكتشفن وصلات الشعر المثالية لأسلوب حياتهن.",
          shopExtensions: "تسوقي الوصلات",
          learnMore: "اعرفي المزيد"
        }
      },
      testimonials: {
        title: "ما تقوله عميلاتنا",
        subtitle: "لا تصدقي كلامنا فقط - استمعي للنساء اللواتي غيرن إطلالتهن مع وصلات سلطانة هير."
      },
      newsletter: {
        title: "ابقي على اطلاع",
        description: "اشتركي للحصول على عروض حصرية ونصائح التصفيف وكوني أول من يعرف عن الوصولات الجديدة.",
        placeholder: "أدخلي عنوان بريدك الإلكتروني",
        subscribe: "اشتراك",
        subscribing: "جاري الاشتراك...",
        success: "شكراً لاشتراكك! ستحصلين على عروض حصرية ونصائح التصفيف."
      }
    },
    instagram: {
      followUs: "تابعونا على إنستغرام",
      handle: "@soltanahair"
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
      price: "السعر",
      color: "اللون",
      length: "الطول",
      quantity: "الكمية",
      inStock: "متوفر في المخزون وجاهز للشحن",
      freeShipping: "شحن مجاني على الطلبات أكثر من 100$",
      returns: "إرجاع خلال 30 يوماً",
      notFound: "المنتج غير موجود",
      notFoundDesc: "المنتج الذي تبحثين عنه غير موجود أو تم حذفه.",
      detailsTab: "تفاصيل المنتج",
      specificationsTab: "المواصفات",
      reviewsTab: "المراجعات",
      aboutThisProduct: "عن هذا المنتج",
      customerReviews: "مراجعات العميلات",
      writeReview: "اكتبي مراجعة",
      loginToReview: "يرجى",
      toWriteReview: "لكتابة مراجعة.",
      loadingReviews: "جاري تحميل المراجعات...",
      noReviews: "لا توجد مراجعات بعد. كوني أول من يراجع هذا المنتج!",
      rating: "المراجعات",
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
      title: "المتجر",
      filter: "تصفية",
      filterProducts: "تصفية المنتجات",
      applyFilters: "تطبيق المرشحات",
      gridView: "عرض الشبكة",
      listView: "عرض القائمة",
      noProductsFound: "لم يتم العثور على منتجات",
      tryAdjustingFilters: "جربي تعديل المرشحات لرؤية المزيد من النتائج.",
      addToCart: "أضف إلى السلة",
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
