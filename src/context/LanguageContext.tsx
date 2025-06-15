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
    
    // Why Choose Us section
    'home.whyChooseUs.title': 'Why Choose',
    'home.whyChooseUs.titleHighlight': 'SoltanaHair',
    'home.whyChooseUs.subtitle': 'We\'re committed to providing the highest quality hair extensions with exceptional service. Here\'s what makes us different from the rest.',
    'home.whyChooseUs.premiumQuality.title': 'Premium Quality',
    'home.whyChooseUs.premiumQuality.description': '100% Remy human hair extensions sourced ethically and crafted with precision for lasting beauty.',
    'home.whyChooseUs.ethicallySourced.title': 'Ethically Sourced',
    'home.whyChooseUs.ethicallySourced.description': 'We partner with ethical suppliers to ensure our hair extensions are responsibly sourced and fairly traded.',
    'home.whyChooseUs.expertCraftsmanship.title': 'Expert Craftsmanship',
    'home.whyChooseUs.expertCraftsmanship.description': 'Each extension is carefully crafted by skilled artisans to ensure perfect color matching and seamless blending.',
    'home.whyChooseUs.fastShipping.title': 'Fast & Free Shipping',
    'home.whyChooseUs.fastShipping.description': 'Enjoy complimentary shipping on orders over $150 with secure packaging and tracking included.',
    'home.whyChooseUs.colorPerfection.title': 'Color Perfection',
    'home.whyChooseUs.colorPerfection.description': 'Our advanced color-matching technology ensures your extensions blend seamlessly with your natural hair.',
    'home.whyChooseUs.expertSupport.title': 'Expert Support',
    'home.whyChooseUs.expertSupport.description': 'Our beauty consultants provide personalized advice to help you choose the perfect extensions for your style.',
    'home.whyChooseUs.cta.title': 'Ready to Transform Your Look?',
    'home.whyChooseUs.cta.description': 'Join thousands of satisfied customers who have discovered the SoltanaHair difference.',
    'home.whyChooseUs.cta.shopExtensions': 'Shop Extensions',
    'home.whyChooseUs.cta.learnMore': 'Learn More',
    
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
    
    // Instagram section
    'instagram.followUs': 'Follow Us on Instagram',
    'instagram.handle': '@soltanahair',
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
    
    // Why Choose Us section
    'home.whyChooseUs.title': 'Pourquoi Choisir',
    'home.whyChooseUs.titleHighlight': 'SoltanaHair',
    'home.whyChooseUs.subtitle': 'Nous nous engageons à fournir des extensions de cheveux de la plus haute qualité avec un service exceptionnel. Voici ce qui nous distingue des autres.',
    'home.whyChooseUs.premiumQuality.title': 'Qualité Premium',
    'home.whyChooseUs.premiumQuality.description': 'Extensions de cheveux humains Remy 100% sourcées éthiquement et confectionnées avec précision pour une beauté durable.',
    'home.whyChooseUs.ethicallySourced.title': 'Sourcé Éthiquement',
    'home.whyChooseUs.ethicallySourced.description': 'Nous nous associons avec des fournisseurs éthiques pour garantir que nos extensions sont sourcées de manière responsable et équitable.',
    'home.whyChooseUs.expertCraftsmanship.title': 'Artisanat Expert',
    'home.whyChooseUs.expertCraftsmanship.description': 'Chaque extension est soigneusement confectionnée par des artisans qualifiés pour assurer un match parfait des couleurs et un mélange harmonieux.',
    'home.whyChooseUs.fastShipping.title': 'Livraison Rapide et Gratuite',
    'home.whyChooseUs.fastShipping.description': 'Profitez de la livraison gratuite sur les commandes de plus de 150$ avec emballage sécurisé et suivi inclus.',
    'home.whyChooseUs.colorPerfection.title': 'Perfection des Couleurs',
    'home.whyChooseUs.colorPerfection.description': 'Notre technologie avancée de correspondance des couleurs garantit que vos extensions se mélangent parfaitement avec vos cheveux naturels.',
    'home.whyChooseUs.expertSupport.title': 'Support Expert',
    'home.whyChooseUs.expertSupport.description': 'Nos consultants beauté fournissent des conseils personnalisés pour vous aider à choisir les extensions parfaites pour votre style.',
    'home.whyChooseUs.cta.title': 'Prêt à Transformer Votre Look?',
    'home.whyChooseUs.cta.description': 'Rejoignez des milliers de clients satisfaits qui ont découvert la différence SoltanaHair.',
    'home.whyChooseUs.cta.shopExtensions': 'Acheter Extensions',
    'home.whyChooseUs.cta.learnMore': 'En Savoir Plus',
    
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
    
    // Instagram section
    'instagram.followUs': 'Suivez-nous sur Instagram',
    'instagram.handle': '@soltanahair',
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
    'nav.register': 'إنشاء حساب',
    'nav.logout': 'تسجيل الخروج',
    'nav.orders': 'الطلبات',
    'nav.admin': 'المدير',
    'nav.adminDashboard': 'لوحة التحكم',
    
    // Home page
    'home.hero.title': 'وصلات الشعر الفاخرة',
    'home.hero.subtitle': 'لكل ملكة',
    'home.hero.description': 'غيري إطلالتك مع وصلات الشعر عالية الجودة. مصدرها أخلاقي، مصنوعة بعناية، ومصممة لتجعلك تشعرين بالثقة.',
    'home.hero.shopNow': 'تسوقي الآن',
    'home.hero.ourStory': 'قصتنا',
    'home.featured.title': 'المنتجات المميزة',
    'home.featured.viewAll': 'عرض الكل',
    'home.testimonials.title': 'ماذا تقول عميلاتنا',
    'home.testimonials.subtitle': 'اقرئي التقييمات الحقيقية من عميلاتنا السعيدات',
    'home.newsletter.title': 'انضمي إلى مجتمعنا',
    'home.newsletter.description': 'اشتركي في نشرتنا الإخبارية للحصول على عروض حصرية ونصائح العناية بالشعر وآخر الأخبار عن المنتجات الجديدة.',
    'home.newsletter.placeholder': 'عنوان بريدك الإلكتروني',
    'home.newsletter.subscribe': 'اشتراك',
    'home.newsletter.subscribing': 'جاري الاشتراك...',
    'home.newsletter.success': 'شكراً لك على الاشتراك في نشرتنا الإخبارية!',
    
    // Why Choose Us section
    'home.whyChooseUs.title': 'لماذا تختارين',
    'home.whyChooseUs.titleHighlight': 'سلطانة هير',
    'home.whyChooseUs.subtitle': 'نحن ملتزمون بتقديم وصلات الشعر عالية الجودة مع خدمة استثنائية. إليك ما يميزنا عن غيرنا.',
    'home.whyChooseUs.premiumQuality.title': 'جودة فاخرة',
    'home.whyChooseUs.premiumQuality.description': 'وصلات شعر طبيعي ريمي 100% مصدرها أخلاقي ومصنوعة بدقة للحصول على جمال دائم.',
    'home.whyChooseUs.ethicallySourced.title': 'مصدر أخلاقي',
    'home.whyChooseUs.ethicallySourced.description': 'نشارك مع موردين أخلاقيين لضمان أن وصلات الشعر مصدرها مسؤول وعادل.',
    'home.whyChooseUs.expertCraftsmanship.title': 'حرفية خبيرة',
    'home.whyChooseUs.expertCraftsmanship.description': 'كل وصلة مصنوعة بعناية من قبل حرفيين ماهرين لضمان مطابقة مثالية للون ومزج سلس.',
    'home.whyChooseUs.fastShipping.title': 'شحن سريع ومجاني',
    'home.whyChooseUs.fastShipping.description': 'استمتعي بالشحن المجاني على الطلبات أكثر من 150 دولار مع تغليف آمن وتتبع مضمن.',
    'home.whyChooseUs.colorPerfection.title': 'إتقان الألوان',
    'home.whyChooseUs.colorPerfection.description': 'تقنيتنا المتقدمة لمطابقة الألوان تضمن امتزاج وصلاتك بسلاسة مع شعرك الطبيعي.',
    'home.whyChooseUs.expertSupport.title': 'دعم خبير',
    'home.whyChooseUs.expertSupport.description': 'مستشارات الجمال لدينا يقدمن نصائح شخصية لمساعدتك في اختيار الوصلات المثالية لأسلوبك.',
    'home.whyChooseUs.cta.title': 'مستعدة لتغيير إطلالتك؟',
    'home.whyChooseUs.cta.description': 'انضمي إلى آلاف العميلات السعيدات اللواتي اكتشفن الفرق مع سلطانة هير.',
    'home.whyChooseUs.cta.shopExtensions': 'تسوقي الوصلات',
    'home.whyChooseUs.cta.learnMore': 'اعرفي المزيد',
    
    // Product
    'product.sale': 'تخفيض',
    'product.rating': 'التقييم',
    'product.viewMore': 'عرض المزيد من المنتجات',
    'product.youMayLike': 'قد يعجبك أيضاً',
    'product.noProducts': 'لا توجد منتجات متاحة حالياً. تفقدي لاحقاً!',
    'product.viewAllProducts': 'عرض جميع المنتجات',
    
    // Footer
    'footer.brand.description': 'وصلات الشعر عالية الجودة لكل ملكة. ارتقي بإطلالتك مع منتجات الشعر الفاخرة.',
    'footer.shop': 'المتجر',
    'footer.allProducts': 'جميع المنتجات',
    'footer.clipIns': 'كليب إن',
    'footer.tapeIns': 'تيب إن',
    'footer.ponytails': 'ذيل الحصان',
    'footer.wigs': 'الباروكة',
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
    
    // Instagram section
    'instagram.followUs': 'تابعونا على إنستغرام',
    'instagram.handle': '@soltanahair',
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
