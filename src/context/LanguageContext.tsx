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

    // Account page
    'account.details': 'Account Details',
    'account.address': 'Addresses',
    'account.password': 'Change Password',
    'account.personalInfo': 'Personal Information',
    'account.firstName': 'First Name',
    'account.lastName': 'Last Name',
    'account.emailAddress': 'Email Address',
    'account.emailCannotUpdate': 'Email cannot be updated',
    'account.updateProfile': 'Update Profile',
    'account.updating': 'Updating...',
    'account.loading': 'Loading profile information...',
    'account.currentPassword': 'Current Password',
    'account.currentPasswordPlaceholder': 'Enter current password',
    'account.newPassword': 'New Password',
    'account.newPasswordPlaceholder': 'Enter new password',
    'account.confirmPassword': 'Confirm New Password',
    'account.confirmPasswordPlaceholder': 'Confirm new password',
    'account.updatePassword': 'Update Password',

    // Login page
    'login.title': 'Log In to Your Account',
    'login.emailLabel': 'Email Address',
    'login.emailPlaceholder': 'Enter your email',
    'login.passwordLabel': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.forgotPassword': 'Forgot password?',
    'login.submitButton': 'Log In',
    'login.loggingIn': 'Logging in...',
    'login.or': 'or',
    'login.noAccount': "Don't have an account?",
    'login.signupLink': 'Sign up',
    'login.error': 'Invalid email or password. Please try again.',
    'login.defaultError': 'Login failed. Please try again.',
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

    // Account page
    'account.details': 'Détails du compte',
    'account.address': 'Adresses',
    'account.password': 'Changer le mot de passe',
    'account.personalInfo': 'Informations personnelles',
    'account.firstName': 'Prénom',
    'account.lastName': 'Nom',
    'account.emailAddress': 'Adresse email',
    'account.emailCannotUpdate': 'L\'email ne peut pas être modifié',
    'account.updateProfile': 'Mettre à jour le profil',
    'account.updating': 'Mise à jour...',
    'account.loading': 'Chargement des informations du profil...',
    'account.currentPassword': 'Mot de passe actuel',
    'account.currentPasswordPlaceholder': 'Entrez le mot de passe actuel',
    'account.newPassword': 'Nouveau mot de passe',
    'account.newPasswordPlaceholder': 'Entrez le nouveau mot de passe',
    'account.confirmPassword': 'Confirmer le nouveau mot de passe',
    'account.confirmPasswordPlaceholder': 'Confirmez le nouveau mot de passe',
    'account.updatePassword': 'Mettre à jour le mot de passe',
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

    // Account page
    'account.details': 'تفاصيل الحساب',
    'account.address': 'العناوين',
    'account.password': 'تغيير كلمة المرور',
    'account.personalInfo': 'المعلومات الشخصية',
    'account.firstName': 'الاسم الأول',
    'account.lastName': 'اسم العائلة',
    'account.emailAddress': 'البريد الإلكتروني',
    'account.emailCannotUpdate': 'لا يمكن تحديث البريد الإلكتروني',
    'account.updateProfile': 'تحديث الملف الشخصي',
    'account.updating': 'جاري التحديث...',
    'account.loading': 'جاري تحميل معلومات الملف الشخصي...',
    'account.currentPassword': 'كلمة المرور الحالية',
    'account.currentPasswordPlaceholder': 'أدخل كلمة المرور الحالية',
    'account.newPassword': 'كلمة المرور الجديدة',
    'account.newPasswordPlaceholder': 'أدخل كلمة المرور الجديدة',
    'account.confirmPassword': 'تأكيد كلمة المرور الجديدة',
    'account.confirmPasswordPlaceholder': 'أكد كلمة المرور الجديدة',
    'account.updatePassword': 'تحديث كلمة المرور',
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
