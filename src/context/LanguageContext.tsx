
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
    // Common
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

    // Home page
    'home.hero.title': 'Transform Your Look with',
    'home.hero.subtitle': 'Premium Hair Extensions',
    'home.hero.description': 'Discover our luxurious collection of 100% real human hair extensions. From clip-ins to tape-ins, find your perfect match for effortless beauty and confidence.',
    'home.hero.shopNow': 'Shop Now',
    'home.hero.ourStory': 'Our Story',
    
    // Why Choose Us section
    'home.whyChooseUs.title': 'Why Choose',
    'home.whyChooseUs.titleHighlight': 'Soltana Hair',
    'home.whyChooseUs.subtitle': 'We are committed to providing the highest quality hair extensions with exceptional service and ethical practices.',

    'home.whyChooseUs.premiumQuality.title': 'Premium Quality',
    'home.whyChooseUs.premiumQuality.description': '100% real human hair sourced from the finest donors worldwide.',

    'home.whyChooseUs.ethicallySourced.title': 'Ethically Sourced',
    'home.whyChooseUs.ethicallySourced.description': 'Fair trade practices ensuring donors are compensated fairly.',

    'home.whyChooseUs.expertCraftsmanship.title': 'Expert Craftsmanship',
    'home.whyChooseUs.expertCraftsmanship.description': 'Handcrafted by skilled artisans with years of experience.',

    'home.whyChooseUs.fastShipping.title': 'Fast Shipping',
    'home.whyChooseUs.fastShipping.description': 'Quick and secure delivery worldwide with tracking.',

    'home.whyChooseUs.colorPerfection.title': 'Color Perfection',
    'home.whyChooseUs.colorPerfection.description': 'Professional color matching for seamless blending.',

    'home.whyChooseUs.expertSupport.title': 'Expert Support',
    'home.whyChooseUs.expertSupport.description': '24/7 customer support from hair extension specialists.',

    'home.whyChooseUs.cta.title': 'Ready to Transform Your Look?',
    'home.whyChooseUs.cta.description': 'Join thousands of satisfied customers who trust Soltana Hair for their beauty transformation.',
    'home.whyChooseUs.cta.shopExtensions': 'Shop Extensions',
    'home.whyChooseUs.cta.learnMore': 'Learn More',

    'home.newsletter.title': 'Stay in Touch',
    'home.newsletter.description': 'Be the first to know about new collections, exclusive offers, and hair care tips.',
    'home.newsletter.placeholder': 'Enter your email address',
    'home.newsletter.subscribe': 'Subscribe',
    'home.newsletter.subscribing': 'Subscribing...',
    'home.newsletter.success': 'Thank you for subscribing to our newsletter!',

    // Instagram section
    'instagram.followUs': 'Follow Us on Instagram',
    'instagram.handle': '@soltanahair',

    // Footer
    'footer.brand.description': 'Premium hair extensions made from 100% real human hair. Transform your look with our luxurious collection.',
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

    // About page
    'about.title': 'About Soltana Hair',
    'about.storyAlt': 'Our story',
    'about.ourStory': 'Our Story',
    'about.ourStoryParagraph1': 'Founded with a passion for beauty and quality, Soltana Hair has been transforming lives through premium hair extensions for over a decade. We believe that every woman deserves to feel confident and beautiful, regardless of her natural hair type or length.',
    'about.ourStoryParagraph2': 'Our journey began when our founder struggled to find high-quality, natural-looking hair extensions that matched her unique hair texture. Determined to fill this gap in the market, she sourced the finest 100% real human hair and developed innovative application techniques.',
    'about.ourStoryParagraph3': 'Today, we are proud to serve thousands of satisfied customers worldwide, helping them achieve their dream hair with our carefully curated collection of extensions, wigs, and hair accessories.',
    'about.ourValues': 'Our Values',
    'about.value.quality': 'Quality First',
    'about.value.qualityDesc': 'We source only the finest 100% real human hair, ensuring each piece meets our rigorous quality standards.',
    'about.value.ethics': 'Ethical Sourcing',
    'about.value.ethicsDesc': 'All our hair is ethically sourced with fair compensation to donors and sustainable practices.',
    'about.value.innovation': 'Innovation',
    'about.value.innovationDesc': 'We continuously develop new techniques and products to make hair transformation easier and more natural.',
    'about.commitmentTitle': 'Our Commitment to You',
    'about.commitmentDesc': 'We are committed to providing not just beautiful hair extensions, but a complete experience that empowers you to express your unique style. From our carefully selected materials to our expert craftsmanship, every detail is designed with you in mind.',
    'about.joinFamilyTitle': 'Join the Soltana Family',
    'about.joinFamilyDesc': 'Experience the difference that quality, care, and expertise can make. Discover why thousands of women trust Soltana Hair for their beauty transformations.',
    'about.shopCollection': 'Shop Our Collection',

    // Contact page
    'contact.title': 'Get in Touch',
    'contact.getInTouch': 'Get in Touch',
    'contact.getInTouchDesc': 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    'contact.phone': 'Phone',
    'contact.phoneHours': 'Monday - Friday, 9AM - 6PM EST',
    'contact.email': 'Email',
    'contact.emailDesc': 'We\'ll get back to you within 24 hours',
    'contact.address': 'Address',
    'contact.businessHours': 'Business Hours',
    'contact.businessDay': 'Monday - Friday: 9AM - 6PM EST',
    'contact.businessSat': 'Saturday: 10AM - 4PM EST',
    'contact.businessSun': 'Sunday: Closed',
    'contact.sendMessage': 'Send us a Message',
    'contact.yourName': 'Your Name',
    'contact.yourNamePlaceholder': 'Enter your full name',
    'contact.emailLabel': 'Email Address',
    'contact.emailPlaceholder': 'Enter your email address',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'What is this regarding?',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell us how we can help you...',
    'contact.sendButton': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.faqTitle': 'Frequently Asked Questions',
    'contact.faq1q': 'How long do hair extensions last?',
    'contact.faq1a': 'With proper care, our premium hair extensions can last 6-12 months or longer.',
    'contact.faq2q': 'Can I color the extensions?',
    'contact.faq2a': 'Yes! Our 100% real human hair can be colored, styled, and treated just like your natural hair.',
    'contact.faq3q': 'What if I need help with installation?',
    'contact.faq3a': 'We provide detailed instructions and video tutorials. You can also contact us for personalized guidance.',
    'contact.faq4q': 'Do you offer international shipping?',
    'contact.faq4a': 'Yes, we ship worldwide! Shipping costs and delivery times vary by location.',

    // Shop page
    'shop.title': 'Shop Hair Extensions',
    'shop.filter': 'Filter',
    'shop.filterProducts': 'Filter Products',
    'shop.applyFilters': 'Apply Filters',
    'shop.gridView': 'Grid View',
    'shop.listView': 'List View',
    'shop.filters': 'Filters',
    'shop.noProductsFound': 'No products found',
    'shop.tryAdjustingFilters': 'Try adjusting your filters to see more results.',
    'shop.addToCart': 'Add to Cart',

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

    // Address translations
    'address.savedAddresses': 'Saved Addresses',
    'address.addNewAddress': 'Add New Address',
    'address.editAddress': 'Edit Address',
    'address.addFirstAddress': 'Add Your First Address',
    'address.noAddresses': "You don't have any saved addresses yet.",
    'address.deleteConfirm': 'Are you sure you want to delete this address?',
    'address.label': 'Address Label',
    'address.labelPlaceholder': 'e.g., Home, Work, Office',
    'address.firstName': 'First Name',
    'address.lastName': 'Last Name',
    'address.phone': 'Phone Number',
    'address.streetAddress': 'Street Address',
    'address.city': 'City',
    'address.state': 'State/Province',
    'address.zipCode': 'ZIP/Postal Code',
    'address.country': 'Country',
    'address.setDefault': 'Set as default address',
    'address.default': 'Default',
    'address.saving': 'Saving...',
    'address.addAddress': 'Add Address',
    'address.updateAddress': 'Update Address',
    'address.cancel': 'Cancel',
    'address.loading': 'Loading addresses...',

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

    // Register page
    'register.title': 'Create Your Account',
    'register.firstName': 'First Name',
    'register.firstNamePlaceholder': 'Enter your first name',
    'register.lastName': 'Last Name',
    'register.lastNamePlaceholder': 'Enter your last name',
    'register.emailLabel': 'Email Address',
    'register.emailPlaceholder': 'Enter your email',
    'register.passwordLabel': 'Password',
    'register.passwordPlaceholder': 'Enter your password (min 6 characters)',
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
    'register.loginLink': 'Log in',
    'register.errors.passwordMismatch': 'Passwords do not match',
    'register.errors.acceptTerms': 'You must accept the terms and privacy policy',
    'register.errors.default': 'Registration failed. Please try again.',
  },
  fr: {
    // Common
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

    // Home page
    'home.hero.title': 'Transformez votre look avec',
    'home.hero.subtitle': 'des Extensions de Cheveux Premium',
    'home.hero.description': 'Découvrez notre collection luxueuse d\'extensions de cheveux 100% naturels. Des clip-ins aux tape-ins, trouvez votre match parfait pour une beauté sans effort et pleine de confiance.',
    'home.hero.shopNow': 'Acheter maintenant',
    'home.hero.ourStory': 'Notre histoire',

    // Why Choose Us section
    'home.whyChooseUs.title': 'Pourquoi Choisir',
    'home.whyChooseUs.titleHighlight': 'Soltana Hair',
    'home.whyChooseUs.subtitle': 'Nous nous engageons à fournir des extensions de cheveux de la plus haute qualité avec un service exceptionnel et des pratiques éthiques.',

    'home.whyChooseUs.premiumQuality.title': 'Qualité Premium',
    'home.whyChooseUs.premiumQuality.description': 'Cheveux humains 100% naturels provenant des meilleurs donateurs mondiaux.',

    'home.whyChooseUs.ethicallySourced.title': 'Source Éthique',
    'home.whyChooseUs.ethicallySourced.description': 'Pratiques de commerce équitable garantissant une compensation équitable des donateurs.',

    'home.whyChooseUs.expertCraftsmanship.title': 'Artisanat Expert',
    'home.whyChooseUs.expertCraftsmanship.description': 'Fabriqué à la main par des artisans qualifiés avec des années d\'expérience.',

    'home.whyChooseUs.fastShipping.title': 'Livraison Rapide',
    'home.whyChooseUs.fastShipping.description': 'Livraison rapide et sécurisée dans le monde entier avec suivi.',

    'home.whyChooseUs.colorPerfection.title': 'Perfection des Couleurs',
    'home.whyChooseUs.colorPerfection.description': 'Correspondance de couleurs professionnelle pour un mélange parfait.',

    'home.whyChooseUs.expertSupport.title': 'Support Expert',
    'home.whyChooseUs.expertSupport.description': 'Support client 24/7 de spécialistes en extensions de cheveux.',

    'home.whyChooseUs.cta.title': 'Prêt à Transformer Votre Look?',
    'home.whyChooseUs.cta.description': 'Rejoignez des milliers de clients satisfaits qui font confiance à Soltana Hair pour leur transformation beauté.',
    'home.whyChooseUs.cta.shopExtensions': 'Acheter Extensions',
    'home.whyChooseUs.cta.learnMore': 'En Savoir Plus',

    'home.newsletter.title': 'Restez en contact',
    'home.newsletter.description': 'Soyez le premier à connaître les nouvelles collections, offres exclusives et conseils de soins capillaires.',
    'home.newsletter.placeholder': 'Entrez votre adresse email',
    'home.newsletter.subscribe': 'S\'abonner',
    'home.newsletter.subscribing': 'Abonnement en cours...',
    'home.newsletter.success': 'Merci de vous être abonné à notre newsletter!',

    // Instagram section
    'instagram.followUs': 'Suivez-nous sur Instagram',
    'instagram.handle': '@soltanahair',

    // Footer
    'footer.brand.description': 'Extensions de cheveux premium faites à partir de cheveux humains 100% naturels. Transformez votre look avec notre collection luxueuse.',
    'footer.shop': 'Boutique',
    'footer.allProducts': 'Tous les produits',
    'footer.clipIns': 'Clip-ins',
    'footer.tapeIns': 'Tape-ins',
    'footer.ponytails': 'Queues de cheval',
    'footer.wigs': 'Perruques',
    'footer.company': 'Entreprise',
    'footer.aboutUs': 'À propos de nous',
    'footer.contact': 'Contact',
    'footer.careers': 'Carrières',
    'footer.press': 'Presse',
    'footer.help': 'Aide',
    'footer.shipping': 'Livraison',
    'footer.returns': 'Retours',
    'footer.faq': 'FAQ',
    'footer.privacyPolicy': 'Politique de confidentialité',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.copyright': 'Tous droits réservés.',

    // About page
    'about.title': 'À propos de Soltana Hair',
    'about.storyAlt': 'Notre histoire',
    'about.ourStory': 'Notre Histoire',
    'about.ourStoryParagraph1': 'Fondée avec une passion pour la beauté et la qualité, Soltana Hair transforme des vies grâce à des extensions de cheveux premium depuis plus d\'une décennie. Nous croyons que chaque femme mérite de se sentir confiante et belle, quel que soit son type de cheveux naturels ou leur longueur.',
    'about.ourStoryParagraph2': 'Notre voyage a commencé quand notre fondatrice a eu du mal à trouver des extensions de cheveux de haute qualité et d\'apparence naturelle qui correspondaient à sa texture de cheveux unique. Déterminée à combler cette lacune sur le marché, elle a sourcé les meilleurs cheveux humains 100% naturels et développé des techniques d\'application innovantes.',
    'about.ourStoryParagraph3': 'Aujourd\'hui, nous sommes fiers de servir des milliers de clients satisfaits dans le monde entier, les aidant à obtenir les cheveux de leurs rêves avec notre collection soigneusement sélectionnée d\'extensions, perruques et accessoires capillaires.',
    'about.ourValues': 'Nos Valeurs',
    'about.value.quality': 'Qualité d\'abord',
    'about.value.qualityDesc': 'Nous ne sourceons que les meilleurs cheveux humains 100% naturels, en nous assurant que chaque pièce répond à nos normes de qualité rigoureuses.',
    'about.value.ethics': 'Sourcing éthique',
    'about.value.ethicsDesc': 'Tous nos cheveux sont sourcés de manière éthique avec une compensation équitable aux donateurs et des pratiques durables.',
    'about.value.innovation': 'Innovation',
    'about.value.innovationDesc': 'Nous développons continuellement de nouvelles techniques et produits pour rendre la transformation capillaire plus facile et plus naturelle.',
    'about.commitmentTitle': 'Notre Engagement envers Vous',
    'about.commitmentDesc': 'Nous nous engageons à fournir non seulement de belles extensions de cheveux, mais une expérience complète qui vous permet d\'exprimer votre style unique. De nos matériaux soigneusement sélectionnés à notre savoir-faire expert, chaque détail est conçu en pensant à vous.',
    'about.joinFamilyTitle': 'Rejoignez la famille Soltana',
    'about.joinFamilyDesc': 'Découvrez la différence que la qualité, le soin et l\'expertise peuvent faire. Découvrez pourquoi des milliers de femmes font confiance à Soltana Hair pour leurs transformations beauté.',
    'about.shopCollection': 'Acheter notre collection',

    // Contact page
    'contact.title': 'Contactez-nous',
    'contact.getInTouch': 'Prenez contact',
    'contact.getInTouchDesc': 'Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.',
    'contact.phone': 'Téléphone',
    'contact.phoneHours': 'Lundi - Vendredi, 9h - 18h EST',
    'contact.email': 'Email',
    'contact.emailDesc': 'Nous vous répondrons dans les 24 heures',
    'contact.address': 'Adresse',
    'contact.businessHours': 'Heures d\'ouverture',
    'contact.businessDay': 'Lundi - Vendredi: 9h - 18h EST',
    'contact.businessSat': 'Samedi: 10h - 16h EST',
    'contact.businessSun': 'Dimanche: Fermé',
    'contact.sendMessage': 'Envoyez-nous un message',
    'contact.yourName': 'Votre nom',
    'contact.yourNamePlaceholder': 'Entrez votre nom complet',
    'contact.emailLabel': 'Adresse email',
    'contact.emailPlaceholder': 'Entrez votre adresse email',
    'contact.subject': 'Sujet',
    'contact.subjectPlaceholder': 'De quoi s\'agit-il?',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Dites-nous comment nous pouvons vous aider...',
    'contact.sendButton': 'Envoyer le message',
    'contact.sending': 'Envoi en cours...',
    'contact.faqTitle': 'Questions fréquemment posées',
    'contact.faq1q': 'Combien de temps durent les extensions de cheveux?',
    'contact.faq1a': 'Avec des soins appropriés, nos extensions de cheveux premium peuvent durer 6-12 mois ou plus.',
    'contact.faq2q': 'Puis-je colorer les extensions?',
    'contact.faq2a': 'Oui! Nos cheveux humains 100% naturels peuvent être colorés, coiffés et traités comme vos cheveux naturels.',
    'contact.faq3q': 'Que faire si j\'ai besoin d\'aide pour l\'installation?',
    'contact.faq3a': 'Nous fournissons des instructions détaillées et des tutoriels vidéo. Vous pouvez également nous contacter pour des conseils personnalisés.',
    'contact.faq4q': 'Offrez-vous la livraison internationale?',
    'contact.faq4a': 'Oui, nous livrons dans le monde entier! Les frais de port et délais de livraison varient selon la localisation.',

    // Shop page
    'shop.title': 'Boutique Extensions de Cheveux',
    'shop.filter': 'Filtrer',
    'shop.filterProducts': 'Filtrer les produits',
    'shop.applyFilters': 'Appliquer les filtres',
    'shop.gridView': 'Vue grille',
    'shop.listView': 'Vue liste',
    'shop.filters': 'Filtres',
    'shop.noProductsFound': 'Aucun produit trouvé',
    'shop.tryAdjustingFilters': 'Essayez d\'ajuster vos filtres pour voir plus de résultats.',
    'shop.addToCart': 'Ajouter au panier',

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

    // Address translations
    'address.savedAddresses': 'Adresses enregistrées',
    'address.addNewAddress': 'Ajouter une nouvelle adresse',
    'address.editAddress': 'Modifier l\'adresse',
    'address.addFirstAddress': 'Ajoutez votre première adresse',
    'address.noAddresses': 'Vous n\'avez aucune adresse enregistrée pour le moment.',
    'address.deleteConfirm': 'Êtes-vous sûr de vouloir supprimer cette adresse?',
    'address.label': 'Libellé de l\'adresse',
    'address.labelPlaceholder': 'ex: Domicile, Travail, Bureau',
    'address.firstName': 'Prénom',
    'address.lastName': 'Nom',
    'address.phone': 'Numéro de téléphone',
    'address.streetAddress': 'Adresse de la rue',
    'address.city': 'Ville',
    'address.state': 'État/Province',
    'address.zipCode': 'Code postal',
    'address.country': 'Pays',
    'address.setDefault': 'Définir comme adresse par défaut',
    'address.default': 'Par défaut',
    'address.saving': 'Enregistrement...',
    'address.addAddress': 'Ajouter une adresse',
    'address.updateAddress': 'Mettre à jour l\'adresse',
    'address.cancel': 'Annuler',
    'address.loading': 'Chargement des adresses...',

    // Login page
    'login.title': 'Connectez-vous à votre compte',
    'login.emailLabel': 'Adresse email',
    'login.emailPlaceholder': 'Entrez votre email',
    'login.passwordLabel': 'Mot de passe',
    'login.passwordPlaceholder': 'Entrez votre mot de passe',
    'login.forgotPassword': 'Mot de passe oublié?',
    'login.submitButton': 'Se connecter',
    'login.loggingIn': 'Connexion en cours...',
    'login.or': 'ou',
    'login.noAccount': "Vous n'avez pas de compte?",
    'login.signupLink': 'S\'inscrire',
    'login.error': 'Email ou mot de passe invalide. Veuillez réessayer.',
    'login.defaultError': 'Échec de la connexion. Veuillez réessayer.',

    // Register page
    'register.title': 'Créez votre compte',
    'register.firstName': 'Prénom',
    'register.firstNamePlaceholder': 'Entrez votre prénom',
    'register.lastName': 'Nom',
    'register.lastNamePlaceholder': 'Entrez votre nom',
    'register.emailLabel': 'Adresse email',
    'register.emailPlaceholder': 'Entrez votre email',
    'register.passwordLabel': 'Mot de passe',
    'register.passwordPlaceholder': 'Entrez votre mot de passe (min 6 caractères)',
    'register.confirmPasswordLabel': 'Confirmer le mot de passe',
    'register.confirmPasswordPlaceholder': 'Confirmez votre mot de passe',
    'register.termsPrefix': 'J\'accepte les',
    'register.termsLink': 'Conditions d\'utilisation',
    'register.and': 'et la',
    'register.privacyLink': 'Politique de confidentialité',
    'register.submitButton': 'Créer un compte',
    'register.creatingAccount': 'Création du compte...',
    'register.or': 'ou',
    'register.alreadyAccount': 'Vous avez déjà un compte?',
    'register.loginLink': 'Se connecter',
    'register.errors.passwordMismatch': 'Les mots de passe ne correspondent pas',
    'register.errors.acceptTerms': 'Vous devez accepter les conditions et la politique de confidentialité',
    'register.errors.default': 'Échec de l\'inscription. Veuillez réessayer.',
  },
  ar: {
    // Common
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

    // Home page
    'home.hero.title': 'غيّري إطلالتك مع',
    'home.hero.subtitle': 'وصلات الشعر المميزة',
    'home.hero.description': 'اكتشفي مجموعتنا الفاخرة من وصلات الشعر الطبيعي 100%. من الكليبس إلى التيب إن، اعثري على التطابق المثالي لجمال بلا مجهود وثقة.',
    'home.hero.shopNow': 'تسوقي الآن',
    'home.hero.ourStory': 'قصتنا',

    // Why Choose Us section
    'home.whyChooseUs.title': 'لماذا تختارين',
    'home.whyChooseUs.titleHighlight': 'سولتانا هير',
    'home.whyChooseUs.subtitle': 'نحن ملتزمون بتوفير أعلى جودة من وصلات الشعر مع خدمة استثنائية وممارسات أخلاقية.',

    'home.whyChooseUs.premiumQuality.title': 'جودة مميزة',
    'home.whyChooseUs.premiumQuality.description': 'شعر بشري طبيعي 100% من أفضل المتبرعين حول العالم.',

    'home.whyChooseUs.ethicallySourced.title': 'مصدر أخلاقي',
    'home.whyChooseUs.ethicallySourced.description': 'ممارسات التجارة العادلة التي تضمن تعويض المتبرعين بشكل عادل.',

    'home.whyChooseUs.expertCraftsmanship.title': 'حرفية خبيرة',
    'home.whyChooseUs.expertCraftsmanship.description': 'مصنوعة يدوياً من قبل حرفيين مهرة بسنوات من الخبرة.',

    'home.whyChooseUs.fastShipping.title': 'شحن سريع',
    'home.whyChooseUs.fastShipping.description': 'توصيل سريع وآمن في جميع أنحاء العالم مع التتبع.',

    'home.whyChooseUs.colorPerfection.title': 'مطابقة الألوان المثالية',
    'home.whyChooseUs.colorPerfection.description': 'مطابقة ألوان احترافية للدمج السلس.',

    'home.whyChooseUs.expertSupport.title': 'دعم خبير',
    'home.whyChooseUs.expertSupport.description': 'دعم عملاء على مدار الساعة من متخصصي وصلات الشعر.',

    'home.whyChooseUs.cta.title': 'جاهزة لتغيير إطلالتك؟',
    'home.whyChooseUs.cta.description': 'انضمي لآلاف العملاء الراضين الذين يثقون في سولتانا هير لتحولاتهم الجمالية.',
    'home.whyChooseUs.cta.shopExtensions': 'تسوقي الوصلات',
    'home.whyChooseUs.cta.learnMore': 'اعرفي أكثر',

    'home.newsletter.title': 'ابقي على تواصل',
    'home.newsletter.description': 'كوني أول من يعلم بالمجموعات الجديدة والعروض الحصرية ونصائح العناية بالشعر.',
    'home.newsletter.placeholder': 'أدخلي عنوان بريدك الإلكتروني',
    'home.newsletter.subscribe': 'اشتراك',
    'home.newsletter.subscribing': 'جاري الاشتراك...',
    'home.newsletter.success': 'شكراً لاشتراكك في نشرتنا الإخبارية!',

    // Instagram section
    'instagram.followUs': 'تابعونا على إنستغرام',
    'instagram.handle': '@soltanahair',

    // Footer
    'footer.brand.description': 'وصلات شعر مميزة مصنوعة من شعر بشري طبيعي 100%. غيّري إطلالتك مع مجموعتنا الفاخرة.',
    'footer.shop': 'المتجر',
    'footer.allProducts': 'جميع المنتجات',
    'footer.clipIns': 'الكليبس',
    'footer.tapeIns': 'التيب إن',
    'footer.ponytails': 'ذيل الحصان',
    'footer.wigs': 'الباروكات',
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

    // About page
    'about.title': 'حول سولتانا هير',
    'about.storyAlt': 'قصتنا',
    'about.ourStory': 'قصتنا',
    'about.ourStoryParagraph1': 'تأسست بشغف للجمال والجودة، سولتانا هير تغير الحياة من خلال وصلات الشعر المميزة لأكثر من عقد. نحن نؤمن أن كل امرأة تستحق أن تشعر بالثقة والجمال، بغض النظر عن نوع شعرها الطبيعي أو طوله.',
    'about.ourStoryParagraph2': 'بدأت رحلتنا عندما واجهت مؤسستنا صعوبة في العثور على وصلات شعر عالية الجودة وذات مظهر طبيعي تتناسب مع ملمس شعرها الفريد. مصممة على سد هذه الفجوة في السوق، قامت بتوريد أجود أنواع الشعر البشري الطبيعي 100% وطورت تقنيات تطبيق مبتكرة.',
    'about.ourStoryParagraph3': 'اليوم، نحن فخورون بخدمة آلاف العملاء الراضين حول العالم، مساعدتهم في تحقيق شعر أحلامهم مع مجموعتنا المختارة بعناية من الوصلات والباروكات وإكسسوارات الشعر.',
    'about.ourValues': 'قيمنا',
    'about.value.quality': 'الجودة أولاً',
    'about.value.qualityDesc': 'نقوم بتوريد أجود أنواع الشعر البشري الطبيعي 100% فقط، مضمونين أن كل قطعة تلبي معايير الجودة الصارمة لدينا.',
    'about.value.ethics': 'التوريد الأخلاقي',
    'about.value.ethicsDesc': 'جميع شعرنا يتم توريده بطريقة أخلاقية مع تعويض عادل للمتبرعين وممارسات مستدامة.',
    'about.value.innovation': 'الابتكار',
    'about.value.innovationDesc': 'نطور باستمرار تقنيات ومنتجات جديدة لجعل تحويل الشعر أسهل وأكثر طبيعية.',
    'about.commitmentTitle': 'التزامنا تجاهك',
    'about.commitmentDesc': 'نحن ملتزمون بتوفير ليس فقط وصلات شعر جميلة، ولكن تجربة كاملة تمكنك من التعبير عن أسلوبك الفريد. من موادنا المختارة بعناية إلى حرفيتنا الخبيرة، كل تفصيلة مصممة مع وضعك في الاعتبار.',
    'about.joinFamilyTitle': 'انضمي لعائلة سولتانا',
    'about.joinFamilyDesc': 'اختبري الفرق الذي يمكن أن تحدثه الجودة والعناية والخبرة. اكتشفي لماذا تثق آلاف النساء في سولتانا هير لتحولاتهن الجمالية.',
    'about.shopCollection': 'تسوقي مجموعتنا',

    // Contact page
    'contact.title': 'تواصلي معنا',
    'contact.getInTouch': 'تواصلي معنا',
    'contact.getInTouchDesc': 'نحب أن نسمع منك. أرسلي لنا رسالة وسنرد في أقرب وقت ممكن.',
    'contact.phone': 'الهاتف',
    'contact.phoneHours': 'الاثنين - الجمعة، 9 صباحاً - 6 مساءً بتوقيت شرق أمريكا',
    'contact.email': 'البريد الإلكتروني',
    'contact.emailDesc': 'سنعود إليك خلال 24 ساعة',
    'contact.address': 'العنوان',
    'contact.businessHours': 'ساعات العمل',
    'contact.businessDay': 'الاثنين - الجمعة: 9 صباحاً - 6 مساءً بتوقيت شرق أمريكا',
    'contact.businessSat': 'السبت: 10 صباحاً - 4 مساءً بتوقيت شرق أمريكا',
    'contact.businessSun': 'الأحد: مغلق',
    'contact.sendMessage': 'أرسلي لنا رسالة',
    'contact.yourName': 'اسمك',
    'contact.yourNamePlaceholder': 'أدخلي اسمك الكامل',
    'contact.emailLabel': 'عنوان البريد الإلكتروني',
    'contact.emailPlaceholder': 'أدخلي عنوان بريدك الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.subjectPlaceholder': 'عما يتعلق هذا؟',
    'contact.message': 'الرسالة',
    'contact.messagePlaceholder': 'أخبرينا كيف يمكننا مساعدتك...',
    'contact.sendButton': 'إرسال الرسالة',
    'contact.sending': 'جاري الإرسال...',
    'contact.faqTitle': 'الأسئلة الشائعة',
    'contact.faq1q': 'كم تدوم وصلات الشعر؟',
    'contact.faq1a': 'مع العناية المناسبة، يمكن أن تدوم وصلات الشعر المميزة لدينا 6-12 شهراً أو أكثر.',
    'contact.faq2q': 'هل يمكنني صبغ الوصلات؟',
    'contact.faq2a': 'نعم! شعرنا البشري الطبيعي 100% يمكن صبغه وتصفيفه ومعاملته مثل شعرك الطبيعي تماماً.',
    'contact.faq3q': 'ماذا لو احتجت مساعدة في التركيب؟',
    'contact.faq3a': 'نوفر تعليمات مفصلة ودروس فيديو. يمكنك أيضاً التواصل معنا للحصول على إرشادات شخصية.',
    'contact.faq4q': 'هل تقدمون الشحن الدولي؟',
    'contact.faq4a': 'نعم، نشحن حول العالم! تكاليف الشحن وأوقات التسليم تختلف حسب الموقع.',

    // Shop page
    'shop.title': 'متجر وصلات الشعر',
    'shop.filter': 'فلتر',
    'shop.filterProducts': 'فلترة المنتجات',
    'shop.applyFilters': 'تطبيق الفلاتر',
    'shop.gridView': 'عرض الشبكة',
    'shop.listView': 'عرض القائمة',
    'shop.filters': 'الفلاتر',
    'shop.noProductsFound': 'لم يتم العثور على منتجات',
    'shop.tryAdjustingFilters': 'جربي تعديل الفلاتر لرؤية المزيد من النتائج.',
    'shop.addToCart': 'أضيفي للسلة',

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

    // Address translations
    'address.savedAddresses': 'العناوين المحفوظة',
    'address.addNewAddress': 'إضافة عنوان جديد',
    'address.editAddress': 'تعديل العنوان',
    'address.addFirstAddress': 'أضف عنوانك الأول',
    'address.noAddresses': 'لا توجد عناوين محفوظة حتى الآن.',
    'address.deleteConfirm': 'هل أنت متأكد من حذف هذا العنوان؟',
    'address.label': 'تسمية العنوان',
    'address.labelPlaceholder': 'مثل: المنزل، العمل، المكتب',
    'address.firstName': 'الاسم الأول',
    'address.lastName': 'اسم العائلة',
    'address.phone': 'رقم الهاتف',
    'address.streetAddress': 'عنوان الشارع',
    'address.city': 'المدينة',
    'address.state': 'الولاية/المحافظة',
    'address.zipCode': 'الرمز البريدي',
    'address.country': 'البلد',
    'address.setDefault': 'تعيين كعنوان افتراضي',
    'address.default': 'افتراضي',
    'address.saving': 'جاري الحفظ...',
    'address.addAddress': 'إضافة عنوان',
    'address.updateAddress': 'تحديث العنوان',
    'address.cancel': 'إلغاء',
    'address.loading': 'جاري تحميل العناوين...',

    // Login page
    'login.title': 'تسجيل الدخول إلى حسابك',
    'login.emailLabel': 'البريد الإلكتروني',
    'login.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'login.passwordLabel': 'كلمة المرور',
    'login.passwordPlaceholder': 'أدخل كلمة المرور',
    'login.forgotPassword': 'نسيت كلمة المرور؟',
    'login.submitButton': 'تسجيل الدخول',
    'login.loggingIn': 'جاري تسجيل الدخول...',
    'login.or': 'أو',
    'login.noAccount': 'ليس لديك حساب؟',
    'login.signupLink': 'إنشاء حساب',
    'login.error': 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.',
    'login.defaultError': 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.',

    // Register page
    'register.title': 'إنشاء حسابك',
    'register.firstName': 'الاسم الأول',
    'register.firstNamePlaceholder': 'أدخل اسمك الأول',
    'register.lastName': 'اسم العائلة',
    'register.lastNamePlaceholder': 'أدخل اسم العائلة',
    'register.emailLabel': 'البريد الإلكتروني',
    'register.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'register.passwordLabel': 'كلمة المرور',
    'register.passwordPlaceholder': 'أدخل كلمة المرور (6 أحرف على الأقل)',
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
    'register.loginLink': 'تسجيل الدخول',
    'register.errors.passwordMismatch': 'كلمات المرور غير متطابقة',
    'register.errors.acceptTerms': 'يجب عليك قبول الشروط وسياسة الخصوصية',
    'register.errors.default': 'فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.',
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
