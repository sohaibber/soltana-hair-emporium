
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.wishlist': 'Wishlist',
    'nav.account': 'Account',
    'nav.login': 'Login',
    'nav.register': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.orders': 'Orders',
    'nav.admin': 'Admin',
    'nav.adminDashboard': 'Admin Dashboard',
    
    // Home page
    'home.hero.title': 'Luxury Hair Extensions',
    'home.hero.subtitle': 'for Every Queen',
    'home.hero.description': 'Transform your look with premium quality hair extensions. Ethically sourced, beautifully crafted, and designed to make you feel confident.',
    'home.hero.shopNow': 'Shop Now',
    'home.hero.ourStory': 'Our Story',
    'home.featured.title': 'Featured Products',
    'home.featured.viewAll': 'View All',
    'home.testimonials.title': 'What Our Customers Say',
    'home.testimonials.subtitle': 'Read genuine reviews from our happy customers',
    'home.newsletter.title': 'Join Our Community',
    'home.newsletter.description': 'Subscribe to our newsletter for exclusive offers, hair care tips, and new product announcements.',
    'home.newsletter.placeholder': 'Your email address',
    'home.newsletter.subscribe': 'Subscribe',
    'home.newsletter.subscribing': 'Subscribing...',
    'home.newsletter.success': 'Thank you for subscribing to our newsletter!',
    
    // Product
    'product.sale': 'Sale',
    'product.rating': 'Rating',
    'product.viewMore': 'View More Products',
    'product.youMayLike': 'You may also like',
    'product.noProducts': 'No products available yet. Check back soon!',
    'product.viewAllProducts': 'View All Products',
    
    // Footer
    'footer.brand.description': 'Premium quality hair extensions for every queen. Elevate your look with our luxury hair products.',
    'footer.shop': 'Shop',
    'footer.allProducts': 'All Products',
    'footer.clipIns': 'Clip-ins',
    'footer.tapeIns': 'Tape-ins',
    'footer.ponytails': 'Ponytails',
    'footer.wigs': 'Wigs',
    'footer.company': 'Company',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.help': 'Help',
    'footer.shipping': 'Shipping',
    'footer.returns': 'Returns',
    'footer.faq': 'FAQ',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': 'All rights reserved.',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.searchPlaceholder': 'Search for products...',
    'common.language': 'Language',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.shop': 'Boutique',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.cart': 'Panier',
    'nav.wishlist': 'Liste de souhaits',
    'nav.account': 'Compte',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'nav.logout': 'Déconnexion',
    'nav.orders': 'Commandes',
    'nav.admin': 'Admin',
    'nav.adminDashboard': 'Tableau de bord Admin',
    
    // Home page
    'home.hero.title': 'Extensions de Cheveux de Luxe',
    'home.hero.subtitle': 'pour Chaque Reine',
    'home.hero.description': 'Transformez votre look avec des extensions de cheveux de qualité premium. Sourcées éthiquement, magnifiquement conçues et conçues pour vous faire sentir confiante.',
    'home.hero.shopNow': 'Acheter Maintenant',
    'home.hero.ourStory': 'Notre Histoire',
    'home.featured.title': 'Produits En Vedette',
    'home.featured.viewAll': 'Voir Tout',
    'home.testimonials.title': 'Ce Que Disent Nos Clients',
    'home.testimonials.subtitle': 'Lisez les vrais avis de nos clients satisfaits',
    'home.newsletter.title': 'Rejoignez Notre Communauté',
    'home.newsletter.description': 'Abonnez-vous à notre newsletter pour des offres exclusives, des conseils de soins capillaires et des annonces de nouveaux produits.',
    'home.newsletter.placeholder': 'Votre adresse email',
    'home.newsletter.subscribe': 'S\'abonner',
    'home.newsletter.subscribing': 'Abonnement...',
    'home.newsletter.success': 'Merci de vous être abonné à notre newsletter!',
    
    // Product
    'product.sale': 'Solde',
    'product.rating': 'Note',
    'product.viewMore': 'Voir Plus de Produits',
    'product.youMayLike': 'Vous pourriez aussi aimer',
    'product.noProducts': 'Aucun produit disponible pour le moment. Revenez bientôt!',
    'product.viewAllProducts': 'Voir Tous les Produits',
    
    // Footer
    'footer.brand.description': 'Extensions de cheveux de qualité premium pour chaque reine. Sublimez votre look avec nos produits capillaires de luxe.',
    'footer.shop': 'Boutique',
    'footer.allProducts': 'Tous les Produits',
    'footer.clipIns': 'Clip-ins',
    'footer.tapeIns': 'Tape-ins',
    'footer.ponytails': 'Queues de cheval',
    'footer.wigs': 'Perruques',
    'footer.company': 'Entreprise',
    'footer.aboutUs': 'À Propos de Nous',
    'footer.contact': 'Contact',
    'footer.careers': 'Carrières',
    'footer.press': 'Presse',
    'footer.help': 'Aide',
    'footer.shipping': 'Livraison',
    'footer.returns': 'Retours',
    'footer.faq': 'FAQ',
    'footer.privacyPolicy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions de Service',
    'footer.copyright': 'Tous droits réservés.',
    
    // Common
    'common.loading': 'Chargement...',
    'common.search': 'Rechercher',
    'common.searchPlaceholder': 'Rechercher des produits...',
    'common.language': 'Langue',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.cart': 'السلة',
    'nav.wishlist': 'المفضلة',
    'nav.account': 'الحساب',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    'nav.logout': 'تسجيل الخروج',
    'nav.orders': 'الطلبات',
    'nav.admin': 'الإدارة',
    'nav.adminDashboard': 'لوحة التحكم',
    
    // Home page
    'home.hero.title': 'وصلات الشعر الفاخرة',
    'home.hero.subtitle': 'لكل ملكة',
    'home.hero.description': 'حولي إطلالتك مع وصلات الشعر عالية الجودة. مصدرها أخلاقي، مصنوعة بجمال، ومصممة لتشعري بالثقة.',
    'home.hero.shopNow': 'تسوقي الآن',
    'home.hero.ourStory': 'قصتنا',
    'home.featured.title': 'المنتجات المميزة',
    'home.featured.viewAll': 'عرض الكل',
    'home.testimonials.title': 'ما تقوله عملاؤنا',
    'home.testimonials.subtitle': 'اقرئي التقييمات الحقيقية من عملائنا السعداء',
    'home.newsletter.title': 'انضمي إلى مجتمعنا',
    'home.newsletter.description': 'اشتركي في نشرتنا الإخبارية للحصول على عروض حصرية ونصائح العناية بالشعر وإعلانات المنتجات الجديدة.',
    'home.newsletter.placeholder': 'عنوان بريدك الإلكتروني',
    'home.newsletter.subscribe': 'اشتراك',
    'home.newsletter.subscribing': 'جاري الاشتراك...',
    'home.newsletter.success': 'شكراً لاشتراكك في نشرتنا الإخبارية!',
    
    // Product
    'product.sale': 'تخفيض',
    'product.rating': 'التقييم',
    'product.viewMore': 'عرض المزيد من المنتجات',
    'product.youMayLike': 'قد يعجبك أيضاً',
    'product.noProducts': 'لا توجد منتجات متاحة حالياً. عودي قريباً!',
    'product.viewAllProducts': 'عرض جميع المنتجات',
    
    // Footer
    'footer.brand.description': 'وصلات الشعر عالية الجودة لكل ملكة. ارتقي بإطلالتك مع منتجات الشعر الفاخرة.',
    'footer.shop': 'المتجر',
    'footer.allProducts': 'جميع المنتجات',
    'footer.clipIns': 'كليب إن',
    'footer.tapeIns': 'تيب إن',
    'footer.ponytails': 'ذيل الحصان',
    'footer.wigs': 'الشعر المستعار',
    'footer.company': 'الشركة',
    'footer.aboutUs': 'من نحن',
    'footer.contact': 'اتصل بنا',
    'footer.careers': 'الوظائف',
    'footer.press': 'الصحافة',
    'footer.help': 'المساعدة',
    'footer.shipping': 'الشحن',
    'footer.returns': 'الإرجاع',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.copyright': 'جميع الحقوق محفوظة.',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.search': 'بحث',
    'common.searchPlaceholder': 'البحث عن المنتجات...',
    'common.language': 'اللغة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    // Apply RTL direction to document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const value = {
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
