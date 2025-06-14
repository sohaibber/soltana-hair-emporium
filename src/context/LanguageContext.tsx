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

    // Shop page
    'shop.title': 'Shop Hair Extensions',
    'shop.filter': 'Filter',
    'shop.filterProducts': 'Filter Products',
    'shop.applyFilters': 'Apply Filters',
    'shop.gridView': 'Grid view',
    'shop.listView': 'List view',
    'shop.filters': 'Filters',
    'shop.addToCart': 'Add to Cart',
    'shop.noProductsFound': 'No products found',
    'shop.tryAdjustingFilters': 'Try adjusting your filters',

    // About page
    'about.title': 'About SoltanaHair',
    'about.storyAlt': 'SoltanaHair Story',
    'about.ourStory': 'Our Story',
    'about.ourStoryParagraph1': 'SoltanaHair was founded in 2018 with a simple mission: to provide high-quality, ethically sourced hair extensions that help women feel confident and beautiful. Our founder, Amina, struggled for years to find extensions that matched her hair texture and color perfectly without damaging her natural hair.',
    'about.ourStoryParagraph2': 'After years of research and development, working with experts in the field, SoltanaHair was born. Today, we\'re proud to offer premium hair extensions crafted from 100% Remy human hair, ensuring a natural look and feel that seamlessly blends with your own hair.',
    'about.ourStoryParagraph3': 'Our commitment to quality, ethics, and customer satisfaction has made us a trusted name in the beauty industry, with thousands of satisfied customers across the globe.',
    'about.ourValues': 'Our Values',
    'about.value.quality': 'Quality',
    'about.value.qualityDesc': 'We source only the finest 100% Remy human hair for our extensions, ensuring durability, natural appearance, and ease of styling.',
    'about.value.ethics': 'Ethics',
    'about.value.ethicsDesc': 'We ensure fair compensation for hair donors and maintain ethical sourcing practices throughout our supply chain.',
    'about.value.innovation': 'Innovation',
    'about.value.innovationDesc': 'We continuously research and develop new techniques for more comfortable, natural-looking, and damage-free extensions.',
    'about.commitmentTitle': 'Our Commitment to You',
    'about.commitmentDesc': "At SoltanaHair, we're committed to helping you look and feel your best. We offer personalized consultations, expert advice, and a 30-day satisfaction guarantee on all our products. Our customer service team is always ready to assist you with any questions or concerns.",
    'about.joinFamilyTitle': 'Join the SoltanaHair Family',
    'about.joinFamilyDesc': 'Thousands of women around the world have transformed their look with SoltanaHair extensions. Browse our collection today and discover the perfect match for your hair.',
    'about.shopCollection': 'Shop Our Collection',

    // Contact page
    'contact.title': 'Contact Us',
    'contact.getInTouch': 'Get in Touch',
    'contact.getInTouchDesc': "Have questions about our products? Need advice on choosing the right extensions? Our team is here to help! Fill out the form, and we'll get back to you as soon as possible.",
    'contact.phone': 'Phone',
    'contact.phoneHours': 'Mon-Fri, 9am-5pm EST',
    'contact.email': 'Email',
    'contact.emailDesc': "We'll respond within 24 hours",
    'contact.address': 'Address',
    'contact.businessHours': 'Business Hours',
    'contact.businessDay': 'Monday-Friday: 9am-5pm EST',
    'contact.businessSat': 'Saturday: 10am-2pm EST',
    'contact.businessSun': 'Sunday: Closed',
    'contact.sendMessage': 'Send us a Message',
    'contact.yourName': 'Your Name',
    'contact.yourNamePlaceholder': 'Enter your name',
    'contact.emailLabel': 'Email Address',
    'contact.emailPlaceholder': 'Enter your email',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'Enter subject',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Enter your message',
    'contact.sending': 'Sending...',
    'contact.sendButton': 'Send Message',
    'contact.faqTitle': 'FAQ',
    'contact.faq1q': 'How long do hair extensions last?',
    'contact.faq1a': 'With proper care, our premium Remy hair extensions can last 6-12 months with regular wear.',
    'contact.faq2q': 'Can I color the extensions?',
    'contact.faq2a': 'Yes, our human hair extensions can be dyed. We recommend professional coloring for best results.',
    'contact.faq3q': 'What is your return policy?',
    'contact.faq3a': 'We offer a 30-day satisfaction guarantee. Unopened products can be returned for a full refund.',
    'contact.faq4q': 'How do I care for my extensions?',
    'contact.faq4a': 'Use sulfate-free shampoo and conditioner, avoid excessive heat, and store properly when not in use.',
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

    // Shop page
    'shop.title': "Boutique d'Extensions de Cheveux",
    'shop.filter': "Filtrer",
    'shop.filterProducts': "Filtrer les produits",
    'shop.applyFilters': "Appliquer les filtres",
    'shop.gridView': "Vue en grille",
    'shop.listView': "Vue en liste",
    'shop.filters': "Filtres",
    'shop.addToCart': "Ajouter au panier",
    'shop.noProductsFound': "Aucun produit trouvé",
    'shop.tryAdjustingFilters': "Essayez d'ajuster vos filtres",

    // About page
    'about.title': "À propos de SoltanaHair",
    'about.storyAlt': "L'histoire de SoltanaHair",
    'about.ourStory': "Notre histoire",
    'about.ourStoryParagraph1': "SoltanaHair a été fondée en 2018 avec une mission simple : fournir des extensions de cheveux de haute qualité et sourcées de façon éthique pour aider les femmes à se sentir confiantes et belles. Notre fondatrice, Amina, a longtemps cherché des extensions correspondant parfaitement à sa texture et couleur de cheveux sans abîmer ses cheveux naturels.",
    'about.ourStoryParagraph2': "Après des années de recherche et de développement, en collaboration avec des experts du secteur, SoltanaHair est née. Aujourd'hui, nous sommes fiers d'offrir des extensions premium, confectionnées à partir de cheveux Remy 100%, pour un rendu naturel et un toucher authentique qui se fondent parfaitement à vos cheveux.",
    'about.ourStoryParagraph3': "Notre engagement envers la qualité, l’éthique et la satisfaction client a fait de nous une référence dans l’industrie de la beauté, avec des milliers de clientes satisfaites à travers le monde.",
    'about.ourValues': "Nos valeurs",
    'about.value.quality': "Qualité",
    'about.value.qualityDesc': "Nous sélectionnons uniquement les meilleurs cheveux Remy 100 % pour nos extensions, garantissant durabilité, aspect naturel et facilité de coiffage.",
    'about.value.ethics': "Éthique",
    'about.value.ethicsDesc': "Nous veillons à une juste rémunération des donneurs de cheveux et à des pratiques d’approvisionnement éthiques tout au long de notre chaîne d’approvisionnement.",
    'about.value.innovation': "Innovation",
    'about.value.innovationDesc': "Nous recherchons et développons continuellement de nouvelles techniques pour des extensions plus confortables, naturelles et sans dommage.",
    'about.commitmentTitle': "Notre engagement envers vous",
    'about.commitmentDesc': "Chez SoltanaHair, nous nous engageons à vous aider à vous sentir et paraître à votre meilleur. Nous proposons des consultations personnalisées, des conseils d'experts et une garantie de satisfaction de 30 jours sur tous nos produits. Notre service client est toujours disponible pour répondre à vos questions.",
    'about.joinFamilyTitle': "Rejoignez la famille SoltanaHair",
    'about.joinFamilyDesc': "Des milliers de femmes à travers le monde ont transformé leur look avec les extensions SoltanaHair. Parcourez notre collection et découvrez la meilleure correspondance pour vos cheveux.",
    'about.shopCollection': "Découvrir notre collection",

    // Contact page
    'contact.title': 'Contactez-nous',
    'contact.getInTouch': 'Entrer en contact',
    'contact.getInTouchDesc': "Des questions sur nos produits ? Besoin de conseils pour choisir les extensions idéales ? Notre équipe est là pour vous aider ! Remplissez le formulaire et nous vous répondrons dès que possible.",
    'contact.phone': 'Téléphone',
    'contact.phoneHours': 'Lun-Ven, 9h-17h',
    'contact.email': 'Email',
    'contact.emailDesc': "Nous répondrons sous 24h",
    'contact.address': 'Adresse',
    'contact.businessHours': 'Horaires',
    'contact.businessDay': 'Lundi-vendredi : 9h-17h',
    'contact.businessSat': 'Samedi : 10h-14h',
    'contact.businessSun': 'Dimanche : Fermé',
    'contact.sendMessage': 'Envoyez-nous un message',
    'contact.yourName': 'Votre nom',
    'contact.yourNamePlaceholder': 'Entrez votre nom',
    'contact.emailLabel': 'Adresse email',
    'contact.emailPlaceholder': 'Entrez votre email',
    'contact.subject': 'Sujet',
    'contact.subjectPlaceholder': 'Entrez le sujet',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Entrez votre message',
    'contact.sending': 'Envoi...',
    'contact.sendButton': 'Envoyer le message',
    'contact.faqTitle': 'FAQ',
    'contact.faq1q': 'Combien de temps durent les extensions ?',
    'contact.faq1a': "Avec de bons soins, nos extensions premium Remy peuvent durer de 6 à 12 mois en usage régulier.",
    'contact.faq2q': 'Puis-je colorer les extensions ?',
    'contact.faq2a': "Oui, nos extensions en cheveux naturels peuvent être colorées. Nous recommandons une coloration professionnelle.",
    'contact.faq3q': 'Quelle est votre politique de retour ?',
    'contact.faq3a': "Nous offrons une garantie de satisfaction de 30 jours. Les produits non ouverts peuvent être retournés pour un remboursement complet.",
    'contact.faq4q': 'Comment entretenir mes extensions ?',
    'contact.faq4a': "Utilisez un shampooing et un après-shampooing sans sulfate, évitez la chaleur excessive et rangez-les correctement quand vous ne les portez pas.",
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

    // Shop page
    'shop.title': "تسوقي وصـلات الشعر",
    'shop.filter': "تصفية",
    'shop.filterProducts': "تصفية المنتجات",
    'shop.applyFilters': "تطبيق الفلاتر",
    'shop.gridView': "عرض شبكي",
    'shop.listView': "عرض خطي",
    'shop.filters': "الفلاتر",
    'shop.addToCart': "أضف إلى السلة",
    'shop.noProductsFound': "لا توجد منتجات",
    'shop.tryAdjustingFilters': "حاولي تعديل الفلاتر",

    // About page
    'about.title': "عن سلطانة هير",
    'about.storyAlt': "قصة سلطانة هير",
    'about.ourStory': "قصتنا",
    'about.ourStoryParagraph1': "تأسست سلطانة هير عام 2018 بهدف بسيط: تقديم وصلات شعر عالية الجودة مصدرها أخلاقي لتعزيز ثقة النساء وجمالهن. مؤسستنا أمينة عانت طويلاً لإيجاد وصلات تناسب شعرها دون إضرار شعرها الطبيعي.",
    'about.ourStoryParagraph2': "بعد سنوات من البحث والتطوير مع خبراء المجال، وُلدت ماركة سلطانة هير. اليوم نقدم وصلات ممتازة من شعر ريمى الطبيعي 100% لضمان مظهر وشعور طبيعيين يندمجان بسلاسة مع شعرك.",
    'about.ourStoryParagraph3': "التزامنا بالجودة والأخلاق ورضا العميل جعلنا اسماً موثوقاً في مجال الجمال مع آلاف الزبونات السعيدات حول العالم.",
    'about.ourValues': "قيمنا",
    'about.value.quality': "الجودة",
    'about.value.qualityDesc': "نستخدم فقط أفضل شعر ريمى 100% في وصلاتنا، لضمان المتانة والمظهر الطبيعي وسهولة التصفيف.",
    'about.value.ethics': "الأخلاقيات",
    'about.value.ethicsDesc': "نضمن تعويضاً عادلاً للمتبرعات ونلتزم بممارسات توريد أخلاقية عبر سلسلة التوريد.",
    'about.value.innovation': "الابتكار",
    'about.value.innovationDesc': "نواصل البحث وتطوير تقنيات جديدة لوصلات أكثر راحةً وطبيعية وبدون ضرر.",
    'about.commitmentTitle': "التزامنا لكِ",
    'about.commitmentDesc': "في سلطانة هير، نلتزم بأن تشعري وتظهري بأفضل حال. نقدم استشارات شخصية ونصائح خبراء وضمان رضا لمدة 30 يوماً على جميع المنتجات. فريق خدمة العملاء جاهز دوماً لمساعدتك في أي استفسار.",
    'about.joinFamilyTitle': "انضمي لعائلة سلطانة هير",
    'about.joinFamilyDesc': "آلاف النساء حول العالم غيرن مظهرهن بفضل وصلات سلطانة هير. تصفحي مجموعتنا اليوم واكتشفي أنسب اختيار لشعرك.",
    'about.shopCollection': "تسوقي مجموعتنا",

    // Contact page
    'contact.title': 'تواصلي معنا',
    'contact.getInTouch': "تواصلي معنا",
    'contact.getInTouchDesc': "لديك استفسارات عن منتجاتنا؟ تحتاجين نصيحة لاختيار الوصلات المناسبة؟ فريقنا هنا لمساعدتك! املئي النموذج وسنعود إليكِ في أقرب وقت.",
    'contact.phone': 'الهاتف',
    'contact.phoneHours': 'الإثنين-الجمعة، 9ص-5م',
    'contact.email': 'البريد الإلكتروني',
    'contact.emailDesc': "سوف نرد خلال 24 ساعة",
    'contact.address': 'العنوان',
    'contact.businessHours': 'ساعات العمل',
    'contact.businessDay': 'الإثنين-الجمعة: 9ص-5م',
    'contact.businessSat': 'السبت: 10ص-2م',
    'contact.businessSun': 'الأحد: مغلق',
    'contact.sendMessage': "أرسلي رسالة",
    'contact.yourName': "اسمك",
    'contact.yourNamePlaceholder': "اكتبي اسمك",
    'contact.emailLabel': "البريد الإلكتروني",
    'contact.emailPlaceholder': "أدخلي بريدك الإلكتروني",
    'contact.subject': "الموضوع",
    'contact.subjectPlaceholder': "أدخلي الموضوع",
    'contact.message': "الرسالة",
    'contact.messagePlaceholder': "اكتبي رسالتك",
    'contact.sending': "جاري الإرسال...",
    'contact.sendButton': "إرسال الرسالة",
    'contact.faqTitle': "الأسئلة الشائعة",
    'contact.faq1q': "ما مدة بقاء وصـلات الشعر؟",
    'contact.faq1a': "مع العناية المناسبة، تصل مدة استخدام وصلات ريمي الفاخرة من 6 إلى 12 شهراً.",
    'contact.faq2q': "هل يمكنني صبغ الوصلات؟",
    'contact.faq2a': "نعم، وصـلات شعرنا الطبيعي يمكن صبغها. ننصح بالتلوين لدى مختص.",
    'contact.faq3q': "ما سياسة الإرجاع؟",
    'contact.faq3a': "نقدم ضمان رضا لمدة 30 يوماً. المنتجات غير المفتوحة يمكن إرجاعها لاسترداد كامل.",
    'contact.faq4q': "كيف أعتني بالوصلات؟",
    'contact.faq4a': "استخدمي شامبو وبلسم خاليين من الكبريتات، وابتعدي عن الحرارة الزائدة، واحفظي الوصلات بشكل صحيح عند عدم الاستخدام.",
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
