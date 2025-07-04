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
    'common.language': 'Language',

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

    // Login page
    'login.title': 'Login to Your Account',
    'login.emailLabel': 'Email Address',
    'login.emailPlaceholder': 'Enter your email address',
    'login.passwordLabel': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.forgotPassword': 'Forgot Password?',
    'login.submitButton': 'Login',
    'login.loggingIn': 'Logging in...',
    'login.or': 'or',
    'login.noAccount': "Don't have an account?",
    'login.signupLink': 'Sign up here',

    // Register page
    'register.title': 'Create Your Account',
    'register.firstName': 'First Name',
    'register.firstNamePlaceholder': 'Enter your first name',
    'register.lastName': 'Last Name',
    'register.lastNamePlaceholder': 'Enter your last name',
    'register.emailLabel': 'Email Address',
    'register.emailPlaceholder': 'Enter your email address',
    'register.passwordLabel': 'Password',
    'register.passwordPlaceholder': 'Enter your password',
    'register.confirmPasswordLabel': 'Confirm Password',
    'register.confirmPasswordPlaceholder': 'Confirm your password',
    'register.termsPrefix': 'I agree to the',
    'register.termsLink': 'Terms of Service',
    'register.and': 'and',
    'register.privacyLink': 'Privacy Policy',
    'register.submitButton': 'Create Account',
    'register.creatingAccount': 'Creating account...',
    'register.or': 'or',
    'register.alreadyAccount': 'Already have an account?',
    'register.loginLink': 'Login here',
    'register.errors.passwordMismatch': 'Passwords do not match',
    'register.errors.acceptTerms': 'You must accept the terms and privacy policy',
    'register.errors.default': 'Registration failed. Please try again.',

    // Shop page
    'shop.title': 'Our Collection',
    'shop.filter': 'Filter',
    'shop.filterProducts': 'Filter Products',
    'shop.applyFilters': 'Apply Filters',
    'shop.gridView': 'Grid View',
    'shop.listView': 'List View',
    'shop.filters': 'Filters',
    'shop.noProductsFound': 'No Products Found',
    'shop.tryAdjustingFilters': 'Try adjusting your filters to see more products.',
    'shop.addToCart': 'Add to Cart',

    // About page
    'about.title': 'About Us',
    'about.storyAlt': 'Our story image',
    'about.ourStory': 'Our Story',
    'about.ourStoryParagraph1': 'Founded in 2020, Soltana Hair began as a passion project to provide women with premium quality hair extensions that enhance natural beauty. Our journey started with a simple belief: every woman deserves to feel confident and beautiful.',
    'about.ourStoryParagraph2': 'We source our hair from ethical suppliers worldwide, ensuring that every strand meets our rigorous quality standards. Our team of experts hand-selects each piece to guarantee the finest texture, color, and durability.',
    'about.ourStoryParagraph3': 'Today, we are proud to serve thousands of customers globally, helping them achieve their dream hair with our premium extensions and exceptional customer service.',
    'about.ourValues': 'Our Values',
    'about.value.quality': 'Quality First',
    'about.value.qualityDesc': 'We never compromise on quality. Every product undergoes strict quality control to ensure you receive only the best.',
    'about.value.ethics': 'Ethical Sourcing',
    'about.value.ethicsDesc': 'We work with suppliers who share our commitment to ethical practices and fair compensation.',
    'about.value.innovation': 'Innovation',
    'about.value.innovationDesc': 'We continuously innovate our products and services to meet the evolving needs of our customers.',
    'about.commitmentTitle': 'Our Commitment to You',
    'about.commitmentDesc': 'We are committed to providing you with not just premium hair extensions, but an exceptional experience from the moment you visit our website to the day your order arrives at your door. Your satisfaction is our priority.',
    'about.joinFamilyTitle': 'Join the Soltana Family',
    'about.joinFamilyDesc': 'Experience the difference that quality makes. Join thousands of satisfied customers who have made Soltana Hair their trusted choice for premium hair extensions.',
    'about.shopCollection': 'Shop Our Collection',

    // Contact page
    'contact.title': 'Contact Us',
    'contact.getInTouch': 'Get in Touch',
    'contact.getInTouchDesc': 'We would love to hear from you! Whether you have questions about our products, need styling advice, or want to share your Soltana Hair experience, our team is here to help.',
    'contact.phone': 'Phone',
    'contact.phoneHours': 'Monday-Friday 9AM-6PM EST',
    'contact.email': 'Email',
    'contact.emailDesc': 'We typically respond within 24 hours',
    'contact.address': 'Address',
    'contact.businessHours': 'Business Hours',
    'contact.businessDay': 'Monday-Friday: 9:00 AM - 6:00 PM',
    'contact.businessSat': 'Saturday: 10:00 AM - 4:00 PM',
    'contact.businessSun': 'Sunday: Closed',
    'contact.sendMessage': 'Send us a Message',
    'contact.yourName': 'Your Name',
    'contact.yourNamePlaceholder': 'Enter your full name',
    'contact.emailLabel': 'Email',
    'contact.emailPlaceholder': 'Enter your email address',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'What is this regarding?',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell us how we can help you...',
    'contact.sendButton': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.faqTitle': 'Frequently Asked Questions',
    'contact.faq1q': 'How long do your hair extensions last?',
    'contact.faq1a': 'With proper care, our premium extensions can last 6-12 months or longer.',
    'contact.faq2q': 'Do you offer color matching services?',
    'contact.faq2a': 'Yes! We offer professional color matching to ensure perfect blending with your natural hair.',
    'contact.faq3q': 'What is your return policy?',
    'contact.faq3a': 'We offer a 30-day return policy for unopened products in original packaging.',
    'contact.faq4q': 'Do you ship internationally?',
    'contact.faq4a': 'Yes, we ship worldwide with tracking and insurance included.',
  },
  fr: {
    'common.language': 'Langue',

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

    // Login page
    'login.title': 'Connexion à votre compte',
    'login.emailLabel': 'Adresse email',
    'login.emailPlaceholder': 'Entrez votre adresse email',
    'login.passwordLabel': 'Mot de passe',
    'login.passwordPlaceholder': 'Entrez votre mot de passe',
    'login.forgotPassword': 'Mot de passe oublié?',
    'login.submitButton': 'Se connecter',
    'login.loggingIn': 'Connexion en cours...',
    'login.or': 'ou',
    'login.noAccount': 'Vous n\'avez pas de compte?',
    'login.signupLink': 'Inscrivez-vous ici',

    // Register page
    'register.title': 'Créer votre compte',
    'register.firstName': 'Prénom',
    'register.firstNamePlaceholder': 'Entrez votre prénom',
    'register.lastName': 'Nom de famille',
    'register.lastNamePlaceholder': 'Entrez votre nom de famille',
    'register.emailLabel': 'Adresse email',
    'register.emailPlaceholder': 'Entrez votre adresse email',
    'register.passwordLabel': 'Mot de passe',
    'register.passwordPlaceholder': 'Entrez votre mot de passe',
    'register.confirmPasswordLabel': 'Confirmer le mot de passe',
    'register.confirmPasswordPlaceholder': 'Confirmez votre mot de passe',
    'register.termsPrefix': 'J\'accepte les',
    'register.termsLink': 'Conditions d\'utilisation',
    'register.and': 'et',
    'register.privacyLink': 'Politique de confidentialité',
    'register.submitButton': 'Créer un compte',
    'register.creatingAccount': 'Création du compte...',
    'register.or': 'ou',
    'register.alreadyAccount': 'Vous avez déjà un compte?',
    'register.loginLink': 'Connectez-vous ici',
    'register.errors.passwordMismatch': 'Les mots de passe ne correspondent pas',
    'register.errors.acceptTerms': 'Vous devez accepter les conditions et la politique de confidentialité',
    'register.errors.default': 'Échec de l\'inscription. Veuillez réessayer.',

    // Shop page
    'shop.title': 'Notre Collection',
    'shop.filter': 'Filtrer',
    'shop.filterProducts': 'Filtrer les Produits',
    'shop.applyFilters': 'Appliquer les Filtres',
    'shop.gridView': 'Vue en Grille',
    'shop.listView': 'Vue en Liste',
    'shop.filters': 'Filtres',
    'shop.noProductsFound': 'Aucun Produit Trouvé',
    'shop.tryAdjustingFilters': 'Essayez d\'ajuster vos filtres pour voir plus de produits.',
    'shop.addToCart': 'Ajouter au Panier',

    // About page
    'about.title': 'À Propos de Nous',
    'about.storyAlt': 'Image de notre histoire',
    'about.ourStory': 'Notre Histoire',
    'about.ourStoryParagraph1': 'Fondée en 2020, Soltana Hair a commencé comme un projet passionné pour fournir aux femmes des extensions de cheveux de qualité premium qui rehaussent la beauté naturelle. Notre voyage a commencé avec une simple croyance: chaque femme mérite de se sentir confiante et belle.',
    'about.ourStoryParagraph2': 'Nous nous approvisionnons en cheveux auprès de fournisseurs éthiques du monde entier, garantissant que chaque mèche répond à nos normes de qualité rigoureuses. Notre équipe d\'experts sélectionne manuellement chaque pièce pour garantir la meilleure texture, couleur et durabilité.',
    'about.ourStoryParagraph3': 'Aujourd\'hui, nous sommes fiers de servir des milliers de clients dans le monde, les aidant à obtenir leurs cheveux de rêve avec nos extensions premium et notre service client exceptionnel.',
    'about.ourValues': 'Nos Valeurs',
    'about.value.quality': 'Qualité d\'Abord',
    'about.value.qualityDesc': 'Nous ne faisons jamais de compromis sur la qualité. Chaque produit subit un contrôle qualité strict pour vous assurer de recevoir seulement le meilleur.',
    'about.value.ethics': 'Approvisionnement Éthique',
    'about.value.ethicsDesc': 'Nous travaillons avec des fournisseurs qui partagent notre engagement envers les pratiques éthiques et la compensation équitable.',
    'about.value.innovation': 'Innovation',
    'about.value.innovationDesc': 'Nous innovons continuellement nos produits et services pour répondre aux besoins évolutifs de nos clients.',
    'about.commitmentTitle': 'Notre Engagement Envers Vous',
    'about.commitmentDesc': 'Nous nous engageons à vous fournir non seulement des extensions de cheveux premium, mais une expérience exceptionnelle du moment où vous visitez notre site web jusqu\'au jour où votre commande arrive à votre porte. Votre satisfaction est notre priorité.',
    'about.joinFamilyTitle': 'Rejoignez la Famille Soltana',
    'about.joinFamilyDesc': 'Découvrez la différence que fait la qualité. Rejoignez des milliers de clients satisfaits qui ont fait de Soltana Hair leur choix de confiance pour les extensions de cheveux premium.',
    'about.shopCollection': 'Voir Notre Collection',

    // Contact page
    'contact.title': 'Contactez-Nous',
    'contact.getInTouch': 'Entrez en Contact',
    'contact.getInTouchDesc': 'Nous aimerions avoir de vos nouvelles! Que vous ayez des questions sur nos produits, besoin de conseils de coiffure, ou que vous vouliez partager votre expérience Soltana Hair, notre équipe est là pour vous aider.',
    'contact.phone': 'Téléphone',
    'contact.phoneHours': 'Lundi-Vendredi 9h-18h EST',
    'contact.email': 'Email',
    'contact.emailDesc': 'Nous répondons généralement dans les 24 heures',
    'contact.address': 'Adresse',
    'contact.businessHours': 'Heures d\'Ouverture',
    'contact.businessDay': 'Lundi-Vendredi: 9h00 - 18h00',
    'contact.businessSat': 'Samedi: 10h00 - 16h00',
    'contact.businessSun': 'Dimanche: Fermé',
    'contact.sendMessage': 'Envoyez-nous un Message',
    'contact.yourName': 'Votre Nom',
    'contact.yourNamePlaceholder': 'Entrez votre nom complet',
    'contact.emailLabel': 'Email',
    'contact.emailPlaceholder': 'Entrez votre adresse email',
    'contact.subject': 'Sujet',
    'contact.subjectPlaceholder': 'De quoi s\'agit-il?',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Dites-nous comment nous pouvons vous aider...',
    'contact.sendButton': 'Envoyer le Message',
    'contact.sending': 'Envoi en cours...',
    'contact.faqTitle': 'Questions Fréquemment Posées',
    'contact.faq1q': 'Combien de temps durent vos extensions de cheveux?',
    'contact.faq1a': 'Avec un soin approprié, nos extensions premium peuvent durer 6-12 mois ou plus.',
    'contact.faq2q': 'Offrez-vous des services de correspondance de couleur?',
    'contact.faq2a': 'Oui! Nous offrons une correspondance de couleur professionnelle pour assurer un mélange parfait avec vos cheveux naturels.',
    'contact.faq3q': 'Quelle est votre politique de retour?',
    'contact.faq3a': 'Nous offrons une politique de retour de 30 jours pour les produits non ouverts dans leur emballage d\'origine.',
    'contact.faq4q': 'Expédiez-vous à l\'international?',
    'contact.faq4a': 'Oui, nous expédions dans le monde entier avec suivi et assurance inclus.',
  },
  ar: {
    'common.language': 'اللغة',

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

    // Login page
    'login.title': 'تسجيل الدخول إلى حسابك',
    'login.emailLabel': 'عنوان البريد الإلكتروني',
    'login.emailPlaceholder': 'أدخل عنوان بريدك الإلكتروني',
    'login.passwordLabel': 'كلمة المرور',
    'login.passwordPlaceholder': 'أدخل كلمة المرور',
    'login.forgotPassword': 'نسيت كلمة المرور؟',
    'login.submitButton': 'تسجيل الدخول',
    'login.loggingIn': 'جاري تسجيل الدخول...',
    'login.or': 'أو',
    'login.noAccount': 'ليس لديك حساب؟',
    'login.signupLink': 'سجل هنا',

    // Register page
    'register.title': 'إنشاء حسابك',
    'register.firstName': 'الاسم الأول',
    'register.firstNamePlaceholder': 'أدخل اسمك الأول',
    'register.lastName': 'اسم العائلة',
    'register.lastNamePlaceholder': 'أدخل اسم العائلة',
    'register.emailLabel': 'عنوان البريد الإلكتروني',
    'register.emailPlaceholder': 'أدخل عنوان بريدك الإلكتروني',
    'register.passwordLabel': 'كلمة المرور',
    'register.passwordPlaceholder': 'أدخل كلمة المرور',
    'register.confirmPasswordLabel': 'تأكيد كلمة المرور',
    'register.confirmPasswordPlaceholder': 'أكد كلمة المرور',
    'register.termsPrefix': 'أوافق على',
    'register.termsLink': 'شروط الخدمة',
    'register.and': 'و',
    'register.privacyLink': 'سياسة الخصوصية',
    'register.submitButton': 'إنشاء حساب',
    'register.creatingAccount': 'جاري إنشاء الحساب...',
    'register.or': 'أو',
    'register.alreadyAccount': 'لديك حساب بالفعل؟',
    'register.loginLink': 'سجل الدخول هنا',
    'register.errors.passwordMismatch': 'كلمات المرور غير متطابقة',
    'register.errors.acceptTerms': 'يجب عليك قبول الشروط وسياسة الخصوصية',
    'register.errors.default': 'فشل في التسجيل. يرجى المحاولة مرة أخرى.',

    // Shop page
    'shop.title': 'مجموعتنا',
    'shop.filter': 'فلتر',
    'shop.filterProducts': 'فلترة المنتجات',
    'shop.applyFilters': 'تطبيق الفلاتر',
    'shop.gridView': 'عرض شبكي',
    'shop.listView': 'عرض قائمة',
    'shop.filters': 'الفلاتر',
    'shop.noProductsFound': 'لم يتم العثور على منتجات',
    'shop.tryAdjustingFilters': 'جربي تعديل الفلاتر لرؤية المزيد من المنتجات.',
    'shop.addToCart': 'أضيفي للسلة',

    // About page
    'about.title': 'من نحن',
    'about.storyAlt': 'صورة قصتنا',
    'about.ourStory': 'قصتنا',
    'about.ourStoryParagraph1': 'تأسست سولتانا هير في عام 2020 كمشروع شغف لتزويد النساء بوصلات الشعر عالية الجودة التي تعزز الجمال الطبيعي. بدأت رحلتنا بإيمان بسيط: كل امرأة تستحق أن تشعر بالثقة والجمال.',
    'about.ourStoryParagraph2': 'نحن نحصل على شعرنا من موردين أخلاقيين حول العالم، مما يضمن أن كل خصلة تلبي معايير الجودة الصارمة لدينا. فريق خبرائنا يختار كل قطعة يدوياً لضمان أفضل ملمس ولون ومتانة.',
    'about.ourStoryParagraph3': 'اليوم، نحن فخورون بخدمة آلاف العملاء عالمياً، مساعدتهم في تحقيق شعر أحلامهم مع وصلاتنا المميزة وخدمة العملاء الاستثنائية.',
    'about.ourValues': 'قيمنا',
    'about.value.quality': 'الجودة أولاً',
    'about.value.qualityDesc': 'نحن لا نساوم أبداً على الجودة. كل منتج يخضع لمراقبة جودة صارمة لضمان حصولك على الأفضل فقط.',
    'about.value.ethics': 'المصادر الأخلاقية',
    'about.value.ethicsDesc': 'نحن نعمل مع موردين يشاركوننا التزامنا بالممارسات الأخلاقية والتعويض العادل.',
    'about.value.innovation': 'الابتكار',
    'about.value.innovationDesc': 'نحن نبتكر باستمرار منتجاتنا وخدماتنا لتلبية الاحتياجات المتطورة لعملائنا.',
    'about.commitmentTitle': 'التزامنا تجاهك',
    'about.commitmentDesc': 'نحن ملتزمون بتزويدك ليس فقط بوصلات الشعر المميزة، ولكن بتجربة استثنائية من لحظة زيارتك لموقعنا حتى يوم وصول طلبك إلى بابك. رضاك هو أولويتنا.',
    'about.joinFamilyTitle': 'انضمي لعائلة سولتانا',
    'about.joinFamilyDesc': 'اختبري الفرق الذي تصنعه الجودة. انضمي لآلاف العملاء الراضين الذين جعلوا سولتانا هير خيارهم الموثوق للوصلات المميزة.',
    'about.shopCollection': 'تسوقي مجموعتنا',

    // Contact page
    'contact.title': 'اتصل بنا',
    'contact.getInTouch': 'تواصل معنا',
    'contact.getInTouchDesc': 'نود أن نسمع منك! سواء كان لديك أسئلة حول منتجاتنا، تحتاجين نصائح للتصفيف، أو تريدين مشاركة تجربتك مع سولتانا هير، فريقنا هنا لمساعدتك.',
    'contact.phone': 'الهاتف',
    'contact.phoneHours': 'الاثنين-الجمعة 9ص-6م بتوقيت شرق أمريكا',
    'contact.email': 'البريد الإلكتروني',
    'contact.emailDesc': 'نرد عادة خلال 24 ساعة',
    'contact.address': 'العنوان',
    'contact.businessHours': 'ساعات العمل',
    'contact.businessDay': 'الاثنين-الجمعة: 9:00 ص - 6:00 م',
    'contact.businessSat': 'السبت: 10:00 ص - 4:00 م',
    'contact.businessSun': 'الأحد: مغلق',
    'contact.sendMessage': 'أرسل لنا رسالة',
    'contact.yourName': 'اسمك',
    'contact.yourNamePlaceholder': 'أدخل اسمك الكامل',
    'contact.emailLabel': 'البريد الإلكتروني',
    'contact.emailPlaceholder': 'أدخل عنوان بريدك الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.subjectPlaceholder': 'ما هو هذا بخصوص؟',
    'contact.message': 'الرسالة',
    'contact.messagePlaceholder': 'أخبرنا كيف يمكننا مساعدتك...',
    'contact.sendButton': 'إرسال الرسالة',
    'contact.sending': 'جاري الإرسال...',
    'contact.faqTitle': 'الأسئلة الشائعة',
    'contact.faq1q': 'كم تدوم وصلات الشعر لديكم؟',
    'contact.faq1a': 'مع العناية المناسبة، يمكن أن تدوم وصلاتنا المميزة 6-12 شهراً أو أكثر.',
    'contact.faq2q': 'هل تقدمون خدمات مطابقة الألوان؟',
    'contact.faq2a': 'نعم! نقدم مطابقة ألوان احترافية لضمان الدمج المثالي مع شعرك الطبيعي.',
    'contact.faq3q': 'ما هي سياسة الإرجاع لديكم؟',
    'contact.faq3a': 'نقدم سياسة إرجاع لمدة 30 يوماً للمنتجات غير المفتوحة في عبوتها الأصلية.',
    'contact.faq4q': 'هل تشحنون دولياً؟',
    'contact.faq4a': 'نعم، نشحن لجميع أنحاء العالم مع التتبع والتأمين مشمولين.',
  }
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
    const translation = translations[language][key as keyof typeof translations['en']];
    console.log(`Translation for ${key}:`, translation);
    return translation || key;
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
