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

    // Featured Products section
    'home.featured.title': 'Featured Products',
    'home.featured.subtitle': 'Discover our most popular hair extensions',
    'home.featured.viewAll': 'View All Products',
    
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

    // Testimonials section
    'home.testimonials.title': 'What Our Customers Say',
    'home.testimonials.subtitle': 'Read real reviews from women who have transformed their look with our premium hair extensions.',

    // Category Banner section
    'home.categories.title': 'Shop By Category',
    'home.categories.subtitle': 'Find the perfect extensions for your hair type and style',
    'home.categories.shopNow': 'Shop Now',

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

    // Product page
    'product.notFound': 'Product Not Found',
    'product.notFoundDesc': 'The product you\'re looking for doesn\'t exist or has been removed.',
    'product.viewAllProducts': 'View All Products',
    'product.price': 'Price',
    'product.reviews': 'Reviews',
    'product.rating': 'Rating',
    'product.color': 'Color',
    'product.length': 'Length',
    'product.quantity': 'Quantity',
    'product.inStock': 'In Stock & Ready to Ship',
    'product.freeShipping': 'Free Shipping on Orders Over $100',
    'product.returns': '30-Day Returns',
    'product.detailsTab': 'Product Details',
    'product.specificationsTab': 'Specifications',
    'product.reviewsTab': 'Reviews',
    'product.aboutThisProduct': 'About this Product',
    'product.customerReviews': 'Customer Reviews',
    'product.writeReview': 'Write a Review',
    'product.loginToReview': 'Please',
    'product.toWriteReview': 'to write a review.',
    'product.loadingReviews': 'Loading reviews...',
    'product.noReviews': 'No reviews yet. Be the first to review this product!',
    'product.youMayLike': 'You May Also Like',
    'product.viewMore': 'View More Products',
    'product.sale': 'Sale',

    // Wishlist page
    'wishlist.title': 'Your Wishlist',
    'wishlist.loginToSave': 'Login to save your favorites',
    'wishlist.createAccount': 'Create an account or login to save items to your wishlist and access them from any device.',
    'wishlist.login': 'Login',
    'wishlist.createAccountBtn': 'Create Account',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDesc': 'Save your favorite items to come back to them later.',
    'wishlist.browseProducts': 'Browse Products',
    'wishlist.itemsCount': 'item',
    'wishlist.itemsCountPlural': 'items',
    'wishlist.inYourWishlist': 'in your wishlist',
    'wishlist.clearWishlist': 'Clear Wishlist',
    'wishlist.addToCart': 'Add to Cart',
    'wishlist.continueShopping': 'Continue Shopping',

    // Orders page
    'orders.title': 'Your Orders',
    'orders.loading': 'Loading your orders...',
    'orders.noOrders': 'No orders yet',
    'orders.noOrdersDesc': 'You haven\'t placed any orders yet.',
    'orders.startShopping': 'Start Shopping',
    'orders.orderId': 'Order ID',
    'orders.date': 'Date',
    'orders.status': 'Status',
    'orders.total': 'Total',
    'orders.actions': 'Actions',
    'orders.viewDetails': 'View Details',
    'orders.orderDetails': 'Order',
    'orders.orderDate': 'Order Date',
    'orders.trackingInfo': 'Tracking Information',
    'orders.trackingNumber': 'Tracking Number',
    'orders.shippingAddress': 'Shipping Address',
    'orders.phone': 'Phone',
    'orders.orderItems': 'Order Items',
    'orders.image': 'Image',
    'orders.product': 'Product',
    'orders.quantity': 'Quantity',
    'orders.price': 'Price',
    'orders.subtotal': 'Subtotal',
    'orders.shipping': 'Shipping',
    'orders.free': 'Free',
    'orders.orderTotal': 'Total',

    // Order status
    'orders.status.pending': 'Pending',
    'orders.status.processing': 'Processing',
    'orders.status.shipped': 'Shipped',
    'orders.status.delivered': 'Delivered',
    'orders.status.cancelled': 'Cancelled',

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

    // Featured Products section
    'home.featured.title': 'Produits Vedettes',
    'home.featured.subtitle': 'Découvrez nos extensions de cheveux les plus populaires',
    'home.featured.viewAll': 'Voir Tous les Produits',

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

    // Testimonials section
    'home.testimonials.title': 'Ce que Disent Nos Clientes',
    'home.testimonials.subtitle': 'Lisez de vrais avis de femmes qui ont transformé leur look avec nos extensions de cheveux premium.',

    // Category Banner section
    'home.categories.title': 'Acheter par Catégorie',
    'home.categories.subtitle': 'Trouvez les extensions parfaites pour votre type de cheveux et votre style',
    'home.categories.shopNow': 'Acheter Maintenant',

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

    // Product page
    'product.notFound': 'Produit non trouvé',
    'product.notFoundDesc': 'Le produit que vous recherchez n\'existe pas ou a été supprimé.',
    'product.viewAllProducts': 'Voir tous les produits',
    'product.price': 'Prix',
    'product.reviews': 'Avis',
    'product.rating': 'Note',
    'product.color': 'Couleur',
    'product.length': 'Longueur',
    'product.quantity': 'Quantité',
    'product.inStock': 'En stock et prêt à expédier',
    'product.freeShipping': 'Livraison gratuite pour les commandes de plus de 100$',
    'product.returns': 'Retours sous 30 jours',
    'product.detailsTab': 'Détails du produit',
    'product.specificationsTab': 'Spécifications',
    'product.reviewsTab': 'Avis',
    'product.aboutThisProduct': 'À propos de ce produit',
    'product.customerReviews': 'Avis clients',
    'product.writeReview': 'Écrire un avis',
    'product.loginToReview': 'Veuillez',
    'product.toWriteReview': 'pour écrire un avis.',
    'product.loadingReviews': 'Chargement des avis...',
    'product.noReviews': 'Aucun avis pour le moment. Soyez le premier à évaluer ce produit!',
    'product.youMayLike': 'Vous Pourriez Aussi Aimer',
    'product.viewMore': 'Voir Plus de Produits',
    'product.sale': 'Solde',

    // Wishlist page
    'wishlist.title': 'Votre Liste de Souhaits',
    'wishlist.loginToSave': 'Connectez-vous pour sauvegarder vos favoris',
    'wishlist.createAccount': 'Créez un compte ou connectez-vous pour sauvegarder des articles dans votre liste de souhaits et y accéder depuis n\'importe quel appareil.',
    'wishlist.login': 'Connexion',
    'wishlist.createAccountBtn': 'Créer un compte',
    'wishlist.empty': 'Votre liste de souhaits est vide',
    'wishlist.emptyDesc': 'Sauvegardez vos articles favoris pour y revenir plus tard.',
    'wishlist.browseProducts': 'Parcourir les produits',
    'wishlist.itemsCount': 'article',
    'wishlist.itemsCountPlural': 'articles',
    'wishlist.inYourWishlist': 'dans votre liste de souhaits',
    'wishlist.clearWishlist': 'Vider la liste de souhaits',
    'wishlist.addToCart': 'Ajouter au panier',
    'wishlist.continueShopping': 'Continuer les achats',

    // Orders page
    'orders.title': 'Vos Commandes',
    'orders.loading': 'Chargement de vos commandes...',
    'orders.noOrders': 'Aucune commande pour le moment',
    'orders.noOrdersDesc': 'Vous n\'avez encore passé aucune commande.',
    'orders.startShopping': 'Commencer les achats',
    'orders.orderId': 'ID de commande',
    'orders.date': 'Date',
    'orders.status': 'Statut',
    'orders.total': 'Total',
    'orders.actions': 'Actions',
    'orders.viewDetails': 'Voir les détails',
    'orders.orderDetails': 'Commande',
    'orders.orderDate': 'Date de commande',
    'orders.trackingInfo': 'Informations de suivi',
    'orders.trackingNumber': 'Numéro de suivi',
    'orders.shippingAddress': 'Adresse de livraison',
    'orders.phone': 'Téléphone',
    'orders.orderItems': 'Articles de la commande',
    'orders.image': 'Image',
    'orders.product': 'Produit',
    'orders.quantity': 'Quantité',
    'orders.price': 'Prix',
    'orders.subtotal': 'Sous-total',
    'orders.shipping': 'Livraison',
    'orders.free': 'Gratuit',
    'orders.orderTotal': 'Total',

    // Order status
    'orders.status.pending': 'En attente',
    'orders.status.processing': 'En cours de traitement',
    'orders.status.shipped': 'Expédié',
    'orders.status.delivered': 'Livré',
    'orders.status.cancelled': 'Annulé',
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

    // Featured Products section
    'home.featured.title': 'المنتجات المميزة',
    'home.featured.subtitle': 'اكتشفي وصلات الشعر الأكثر شعبية لدينا',
    'home.featured.viewAll': 'عرض جميع المنتجات',

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

    // Testimonials section
    'home.testimonials.title': 'ما تقوله عملاؤنا',
    'home.testimonials.subtitle': 'اقرئي آراء حقيقية من نساء غيّرن إطلالتهن مع وصلات الشعر المميزة لدينا.',

    // Category Banner section
    'home.categories.title': 'تسوقي حسب الفئة',
    'home.categories.subtitle': 'اعثري على الوصلات المثالية لنوع شعرك وأسلوبك',
    'home.categories.shopNow': 'تسوقي الآن',

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

    // Product page
    'product.notFound': 'المنتج غير موجود',
    'product.notFoundDesc': 'المنتج الذي تبحثين عنه غير موجود أو تم حذفه.',
    'product.viewAllProducts': 'عرض جميع المنتجات',
    'product.price': 'السعر',
    'product.reviews': 'التقييمات',
    'product.rating': 'التقييم',
    'product.color': 'اللون',
    'product.length': 'الطول',
    'product.quantity': 'الكمية',
    'product.inStock': 'متوفر ومستعد للشحن',
    'product.freeShipping': 'شحن مجاني للطلبات أكثر من 100 دولار',
    'product.returns': 'إرجاع خلال 30 يوم',
    'product.detailsTab': 'تفاصيل المنتج',
    'product.specificationsTab': 'المواصفات',
    'product.reviewsTab': 'التقييمات',
    'product.aboutThisProduct': 'حول هذا المنتج',
    'product.customerReviews': 'تقييمات العملاء',
    'product.writeReview': 'اكتبي تقييماً',
    'product.loginToReview': 'يرجى',
    'product.toWriteReview': 'لكتابة تقييم.',
    'product.loadingReviews': 'جاري تحميل التقييمات...',
    'product.noReviews': 'لا توجد تقييمات حتى الآن. كوني أول من يقيم هذا المنتج!',
    'product.youMayLike': 'قد يعجبك أيضاً',
    'product.viewMore': 'عرض المزيد من المنتجات',
    'product.sale': 'تخفيض',

    // Wishlist page
    'wishlist.title': 'قائمة المفضلة',
    'wishlist.loginToSave': 'سجلي الدخول لحفظ المفضلة',
    'wishlist.createAccount': 'أنشئي حساباً أو سجلي الدخول لحفظ المنتجات في قائمة المفضلة والوصول إليها من أي جهاز.',
    'wishlist.login': 'تسجيل الدخول',
    'wishlist.createAccountBtn': 'إنشاء حساب',
    'wishlist.empty': 'قائمة المفضلة فارغة',
    'wishlist.emptyDesc': 'احفظي المنتجات المفضلة للعودة إليها لاحقاً.',
    'wishlist.browseProducts': 'تصفحي المنتجات',
    'wishlist.itemsCount': 'منتج',
    'wishlist.itemsCountPlural': 'منتجات',
    'wishlist.inYourWishlist': 'في قائمة المفضلة',
    'wishlist.clearWishlist': 'مسح قائمة المفضلة',
    'wishlist.addToCart': 'أضيفي للسلة',
    'wishlist.continueShopping': 'متابعة التسوق',

    // Orders page
    'orders.title': 'طلباتك',
    'orders.loading': 'جاري تحميل طلباتك...',
    'orders.noOrders': 'لا توجد طلبات حتى الآن',
    'orders.noOrdersDesc': 'لم تقومي بوضع أي طلبات حتى الآن.',
    'orders.startShopping': 'ابدئي التسوق',
    'orders.orderId': 'رقم الطلب',
    'orders.date': 'التاريخ',
    'orders.status': 'الحالة',
    'orders.total': 'المجموع',
    'orders.actions': 'الإجراءات',
    'orders.viewDetails': 'عرض التفاصيل',
    'orders.orderDetails': 'الطلب',
    'orders.orderDate': 'تاريخ الطلب',
    'orders.trackingInfo': 'معلومات التتبع',
    'orders.trackingNumber': 'رقم التتبع',
    'orders.shippingAddress': 'عنوان الشحن',
    'orders.phone': 'الهاتف',
    'orders.orderItems': 'منتجات الطلب',
    'orders.image': 'الصورة',
    'orders.product': 'المنتج',
    'orders.quantity': 'الكمية',
    'orders.price': 'السعر',
    'orders.subtotal': 'المجموع الفرعي',
    'orders.shipping': 'الشحن',
    'orders.free': 'مجاني',
    'orders.orderTotal': 'المجموع',

    // Order status
    'orders.status.pending': 'قيد الانتظار',
    'orders.status.processing': 'قيد المعالجة',
    'orders.status.shipped': 'تم الشحن',
    'orders.status.delivered': 'تم التسليم',
    'orders.status.cancelled': 'ملغي',
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
