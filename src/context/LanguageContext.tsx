
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
      admin: string;
      adminDashboard: string;
      orders: string;
      wishlist: string;
    };
    home: {
      title: string;
      subtitle: string;
      shopNow: string;
      learnMore: string;
      featuredProducts: string;
      newArrivals: string;
      bestSellers: string;
      hero: {
        title: string;
        subtitle: string;
        description: string;
        shopNow: string;
        ourStory: string;
      };
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
    shop: {
      title: string;
      sortBy: string;
      priceLowToHigh: string;
      priceHighToLow: string;
      newest: string;
      oldest: string;
      addToCart: string;
      items: string;
      filters: string;
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
    about: {
      title: string;
      storyAlt: string;
      ourStory: string;
      ourStoryParagraph1: string;
      ourStoryParagraph2: string;
      ourStoryParagraph3: string;
      ourValues: string;
      value: {
        quality: string;
        qualityDesc: string;
        ethics: string;
        ethicsDesc: string;
        innovation: string;
        innovationDesc: string;
      };
      commitmentTitle: string;
      commitmentDesc: string;
      joinFamilyTitle: string;
      joinFamilyDesc: string;
      shopCollection: string;
    };
    contact: {
      title: string;
      getInTouch: string;
      getInTouchDesc: string;
      phone: string;
      phoneHours: string;
      email: string;
      emailDesc: string;
      address: string;
      businessHours: string;
      businessDay: string;
      businessSat: string;
      businessSun: string;
      sendMessage: string;
      yourName: string;
      yourNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      sending: string;
      sendButton: string;
      faqTitle: string;
      faq1q: string;
      faq1a: string;
      faq2q: string;
      faq2a: string;
      faq3q: string;
      faq3a: string;
      faq4q: string;
      faq4a: string;
    };
    instagram: {
      followUs: string;
      handle: string;
    };
    footer: {
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
      aboutUs: string;
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
    login: {
      title: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      forgotPassword: string;
      submitButton: string;
      loggingIn: string;
      or: string;
      noAccount: string;
      signupLink: string;
    };
    register: {
      title: string;
      firstName: string;
      firstNamePlaceholder: string;
      lastName: string;
      lastNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      confirmPasswordLabel: string;
      confirmPasswordPlaceholder: string;
      termsPrefix: string;
      termsLink: string;
      and: string;
      privacyLink: string;
      submitButton: string;
      creatingAccount: string;
      or: string;
      alreadyAccount: string;
      loginLink: string;
      errors: {
        passwordMismatch: string;
        acceptTerms: string;
        default: string;
      };
    };
    wishlist: {
      title: string;
      loginToSave: string;
      createAccount: string;
      login: string;
      createAccountBtn: string;
      empty: string;
      emptyDesc: string;
      browseProducts: string;
      itemsCount: string;
      itemsCountPlural: string;
      inYourWishlist: string;
      clearWishlist: string;
      addToCart: string;
      continueShopping: string;
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
    common: {
      language: string;
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
      admin: "Admin",
      adminDashboard: "Admin Dashboard",
      orders: "Orders",
      wishlist: "Wishlist",
    },
    home: {
      title: "Welcome to Our Store",
      subtitle: "Discover the best products at the best prices.",
      shopNow: "Shop Now",
      learnMore: "Learn More",
      featuredProducts: "Featured Products",
      newArrivals: "New Arrivals",
      bestSellers: "Best Sellers",
      hero: {
        title: "Transform Your Look",
        subtitle: "Premium Hair Extensions",
        description: "Discover our collection of premium hair extensions designed to enhance your natural beauty with luxurious quality and unmatched comfort.",
        shopNow: "Shop Now",
        ourStory: "Our Story",
      },
      whyChooseUs: {
        title: "Why Choose",
        titleHighlight: "SoltanaHair",
        subtitle: "We're committed to providing you with the highest quality hair extensions and exceptional service that exceeds your expectations.",
        premiumQuality: {
          title: "Premium Quality",
          description: "Our extensions are made with 100% Remy human hair, ensuring natural look and feel that blends seamlessly with your own hair.",
        },
        ethicallySourced: {
          title: "Ethically Sourced",
          description: "We work directly with suppliers who follow ethical practices, ensuring fair compensation for hair donors.",
        },
        expertCraftsmanship: {
          title: "Expert Craftsmanship",
          description: "Each extension is carefully crafted by skilled artisans with years of experience in hair extension manufacturing.",
        },
        fastShipping: {
          title: "Fast Shipping",
          description: "Get your extensions quickly with our expedited shipping options and reliable delivery partners.",
        },
        colorPerfection: {
          title: "Color Perfection",
          description: "Our advanced color-matching system ensures your extensions perfectly match your natural hair color.",
        },
        expertSupport: {
          title: "Expert Support",
          description: "Our hair extension specialists are here to help you choose the perfect extensions and provide styling tips.",
        },
        cta: {
          title: "Ready to Transform Your Look?",
          description: "Join thousands of satisfied customers who trust SoltanaHair for their hair extension needs.",
          shopExtensions: "Shop Extensions",
          learnMore: "Learn More",
        },
      },
      testimonials: {
        title: "What Our Customers Say",
        subtitle: "Don't just take our word for it - hear from our satisfied customers who've transformed their look with SoltanaHair extensions.",
      },
      newsletter: {
        title: "Stay in the Loop",
        description: "Subscribe to our newsletter for exclusive offers, styling tips, and new product announcements.",
        placeholder: "Enter your email address",
        subscribe: "Subscribe",
        subscribing: "Subscribing...",
        success: "Thank you for subscribing! Welcome to the SoltanaHair family.",
      },
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
      filters: "Filters",
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
    about: {
      title: "About Us",
      storyAlt: "Our Story",
      ourStory: "Our Story",
      ourStoryParagraph1: "Founded with a passion for beauty and quality, we've been dedicated to providing premium hair extensions that enhance your natural beauty.",
      ourStoryParagraph2: "Our commitment to excellence drives us to source only the finest materials and work with skilled artisans to create products that exceed expectations.",
      ourStoryParagraph3: "We believe that everyone deserves to feel confident and beautiful, and our products are designed to help you achieve that effortlessly.",
      ourValues: "Our Values",
      value: {
        quality: "Quality",
        qualityDesc: "We use only the finest materials and craftsmanship to ensure our products meet the highest standards.",
        ethics: "Ethics",
        ethicsDesc: "We are committed to ethical sourcing and sustainable practices in all aspects of our business.",
        innovation: "Innovation",
        innovationDesc: "We continuously innovate to bring you the latest in hair extension technology and design.",
      },
      commitmentTitle: "Our Commitment to You",
      commitmentDesc: "We are dedicated to providing exceptional customer service and products that help you look and feel your best every day.",
      joinFamilyTitle: "Join Our Family",
      joinFamilyDesc: "Become part of our community and discover the difference that quality and care can make.",
      shopCollection: "Shop Our Collection",
    },
    contact: {
      title: "Contact Us",
      getInTouch: "Get In Touch",
      getInTouchDesc: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      phone: "Phone",
      phoneHours: "Monday to Friday, 9AM to 6PM EST",
      email: "Email",
      emailDesc: "We'll respond within 24 hours",
      address: "Address",
      businessHours: "Business Hours",
      businessDay: "Monday - Friday: 9:00 AM - 6:00 PM",
      businessSat: "Saturday: 10:00 AM - 4:00 PM",
      businessSun: "Sunday: Closed",
      sendMessage: "Send us a Message",
      yourName: "Your Name",
      yourNamePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      subject: "Subject",
      subjectPlaceholder: "What's this about?",
      message: "Message",
      messagePlaceholder: "Tell us how we can help you...",
      sending: "Sending...",
      sendButton: "Send Message",
      faqTitle: "Frequently Asked Questions",
      faq1q: "How long do hair extensions last?",
      faq1a: "With proper care, our premium hair extensions can last 6-12 months depending on usage and maintenance.",
      faq2q: "How do I choose the right color?",
      faq2a: "We recommend using our color matching guide or contacting our experts for personalized color consultation.",
      faq3q: "Can I style the extensions with heat?",
      faq3a: "Yes! Our human hair extensions can be styled with heat tools just like your natural hair. We recommend using heat protectant.",
      faq4q: "What's your return policy?",
      faq4a: "We offer a 30-day return policy for unused products in original packaging. Custom colored items are final sale.",
    },
    instagram: {
      followUs: "Follow Us on Instagram",
      handle: "@soltanahair",
    },
    footer: {
      brand: {
        description: "Premium hair extensions designed to enhance your natural beauty with luxurious quality and unmatched comfort.",
      },
      shop: "Shop",
      allProducts: "All Products",
      clipIns: "Clip-In Extensions",
      tapeIns: "Tape-In Extensions",
      ponytails: "Ponytails",
      wigs: "Wigs",
      company: "Company",
      aboutUs: "About Us",
      contact: "Contact",
      careers: "Careers",
      press: "Press",
      help: "Help",
      shipping: "Shipping Info",
      returns: "Returns",
      faq: "FAQ",
      privacyPolicy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "All rights reserved.",
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
    login: {
      title: "Sign In",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      forgotPassword: "Forgot Password?",
      submitButton: "Sign In",
      loggingIn: "Signing In...",
      or: "Or",
      noAccount: "Don't have an account?",
      signupLink: "Sign up",
    },
    register: {
      title: "Create Account",
      firstName: "First Name",
      firstNamePlaceholder: "Enter your first name",
      lastName: "Last Name",
      lastNamePlaceholder: "Enter your last name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Create a password",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      termsPrefix: "I agree to the",
      termsLink: "Terms of Service",
      and: "and",
      privacyLink: "Privacy Policy",
      submitButton: "Create Account",
      creatingAccount: "Creating Account...",
      or: "Or",
      alreadyAccount: "Already have an account?",
      loginLink: "Sign in",
      errors: {
        passwordMismatch: "Passwords do not match",
        acceptTerms: "You must accept the terms and privacy policy",
        default: "Registration failed. Please try again.",
      },
    },
    wishlist: {
      title: "My Wishlist",
      loginToSave: "Login to Save Your Favorites",
      createAccount: "Create an account or sign in to save products to your wishlist.",
      login: "Login",
      createAccountBtn: "Create Account",
      empty: "Your Wishlist is Empty",
      emptyDesc: "Start adding products you love to your wishlist.",
      browseProducts: "Browse Products",
      itemsCount: "item",
      itemsCountPlural: "items",
      inYourWishlist: "in your wishlist",
      clearWishlist: "Clear Wishlist",
      addToCart: "Add to Cart",
      continueShopping: "Continue Shopping",
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
    common: {
      language: "Language",
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
      admin: "Admin",
      adminDashboard: "Tableau de Bord Admin",
      orders: "Commandes",
      wishlist: "Liste de Souhaits",
    },
    home: {
      title: "Bienvenue dans Notre Magasin",
      subtitle: "Découvrez les meilleurs produits aux meilleurs prix.",
      shopNow: "Achetez Maintenant",
      learnMore: "En Savoir Plus",
      featuredProducts: "Produits Phares",
      newArrivals: "Nouveaux Arrivages",
      bestSellers: "Meilleures Ventes",
      hero: {
        title: "Transformez Votre Look",
        subtitle: "Extensions de Cheveux Premium",
        description: "Découvrez notre collection d'extensions de cheveux premium conçues pour sublimer votre beauté naturelle avec une qualité luxueuse et un confort inégalé.",
        shopNow: "Achetez Maintenant",
        ourStory: "Notre Histoire",
      },
      whyChooseUs: {
        title: "Pourquoi Choisir",
        titleHighlight: "SoltanaHair",
        subtitle: "Nous nous engageons à vous fournir des extensions de cheveux de la plus haute qualité et un service exceptionnel qui dépasse vos attentes.",
        premiumQuality: {
          title: "Qualité Premium",
          description: "Nos extensions sont faites avec des cheveux humains Remy 100%, garantissant un aspect et une sensation naturels qui se mélangent parfaitement avec vos propres cheveux.",
        },
        ethicallySourced: {
          title: "Source Éthique",
          description: "Nous travaillons directement avec des fournisseurs qui suivent des pratiques éthiques, garantissant une compensation équitable pour les donateurs de cheveux.",
        },
        expertCraftsmanship: {
          title: "Artisanat Expert",
          description: "Chaque extension est soigneusement fabriquée par des artisans qualifiés avec des années d'expérience dans la fabrication d'extensions de cheveux.",
        },
        fastShipping: {
          title: "Expédition Rapide",
          description: "Obtenez rapidement vos extensions avec nos options d'expédition accélérée et nos partenaires de livraison fiables.",
        },
        colorPerfection: {
          title: "Perfection Couleur",
          description: "Notre système avancé d'assortiment des couleurs garantit que vos extensions correspondent parfaitement à votre couleur de cheveux naturelle.",
        },
        expertSupport: {
          title: "Support Expert",
          description: "Nos spécialistes en extensions de cheveux sont là pour vous aider à choisir les extensions parfaites et fournir des conseils de coiffure.",
        },
        cta: {
          title: "Prêt à Transformer Votre Look?",
          description: "Rejoignez des milliers de clients satisfaits qui font confiance à SoltanaHair pour leurs besoins d'extensions de cheveux.",
          shopExtensions: "Acheter Extensions",
          learnMore: "En Savoir Plus",
        },
      },
      testimonials: {
        title: "Ce Que Disent Nos Clients",
        subtitle: "Ne nous croyez pas sur parole - écoutez nos clients satisfaits qui ont transformé leur look avec les extensions SoltanaHair.",
      },
      newsletter: {
        title: "Restez Dans La Boucle",
        description: "Abonnez-vous à notre newsletter pour des offres exclusives, des conseils de coiffure et des annonces de nouveaux produits.",
        placeholder: "Entrez votre adresse e-mail",
        subscribe: "S'abonner",
        subscribing: "Abonnement...",
        success: "Merci de vous être abonné! Bienvenue dans la famille SoltanaHair.",
      },
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
      filters: "Filtres",
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
    about: {
      title: "À Propos de Nous",
      storyAlt: "Notre Histoire",
      ourStory: "Notre Histoire",
      ourStoryParagraph1: "Fondée avec une passion pour la beauté et la qualité, nous nous sommes consacrés à fournir des extensions de cheveux premium qui subliment votre beauté naturelle.",
      ourStoryParagraph2: "Notre engagement envers l'excellence nous pousse à ne rechercher que les meilleurs matériaux et à travailler avec des artisans qualifiés pour créer des produits qui dépassent les attentes.",
      ourStoryParagraph3: "Nous croyons que tout le monde mérite de se sentir confiant et beau, et nos produits sont conçus pour vous aider à y parvenir sans effort.",
      ourValues: "Nos Valeurs",
      value: {
        quality: "Qualité",
        qualityDesc: "Nous utilisons seulement les meilleurs matériaux et artisanat pour garantir que nos produits répondent aux plus hauts standards.",
        ethics: "Éthique",
        ethicsDesc: "Nous nous engageons à un approvisionnement éthique et à des pratiques durables dans tous les aspects de notre entreprise.",
        innovation: "Innovation",
        innovationDesc: "Nous innovons continuellement pour vous apporter les dernières technologies et designs d'extensions de cheveux.",
      },
      commitmentTitle: "Notre Engagement Envers Vous",
      commitmentDesc: "Nous nous consacrons à fournir un service client exceptionnel et des produits qui vous aident à paraître et à vous sentir au mieux chaque jour.",
      joinFamilyTitle: "Rejoignez Notre Famille",
      joinFamilyDesc: "Faites partie de notre communauté et découvrez la différence que la qualité et les soins peuvent apporter.",
      shopCollection: "Achetez Notre Collection",
    },
    contact: {
      title: "Contactez-Nous",
      getInTouch: "Entrez en Contact",
      getInTouchDesc: "Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.",
      phone: "Téléphone",
      phoneHours: "Lundi au vendredi, 9h à 18h EST",
      email: "E-mail",
      emailDesc: "Nous répondrons dans les 24 heures",
      address: "Adresse",
      businessHours: "Heures d'Ouverture",
      businessDay: "Lundi - Vendredi: 9h00 - 18h00",
      businessSat: "Samedi: 10h00 - 16h00",
      businessSun: "Dimanche: Fermé",
      sendMessage: "Envoyez-nous un Message",
      yourName: "Votre Nom",
      yourNamePlaceholder: "Entrez votre nom complet",
      emailLabel: "Adresse E-mail",
      emailPlaceholder: "Entrez votre adresse e-mail",
      subject: "Sujet",
      subjectPlaceholder: "De quoi s'agit-il?",
      message: "Message",
      messagePlaceholder: "Dites-nous comment nous pouvons vous aider...",
      sending: "Envoi...",
      sendButton: "Envoyer le Message",
      faqTitle: "Questions Fréquemment Posées",
      faq1q: "Combien de temps durent les extensions de cheveux?",
      faq1a: "Avec des soins appropriés, nos extensions de cheveux premium peuvent durer 6-12 mois selon l'utilisation et l'entretien.",
      faq2q: "Comment choisir la bonne couleur?",
      faq2a: "Nous recommandons d'utiliser notre guide d'assortiment des couleurs ou de contacter nos experts pour une consultation couleur personnalisée.",
      faq3q: "Puis-je coiffer les extensions avec de la chaleur?",
      faq3a: "Oui! Nos extensions de cheveux humains peuvent être coiffées avec des outils chauffants tout comme vos cheveux naturels. Nous recommandons d'utiliser un protecteur de chaleur.",
      faq4q: "Quelle est votre politique de retour?",
      faq4a: "Nous offrons une politique de retour de 30 jours pour les produits non utilisés dans leur emballage d'origine. Les articles de couleur personnalisée sont en vente finale.",
    },
    instagram: {
      followUs: "Suivez-Nous sur Instagram",
      handle: "@soltanahair",
    },
    footer: {
      brand: {
        description: "Extensions de cheveux premium conçues pour sublimer votre beauté naturelle avec une qualité luxueuse et un confort inégalé.",
      },
      shop: "Boutique",
      allProducts: "Tous les Produits",
      clipIns: "Extensions à Clips",
      tapeIns: "Extensions Adhésives",
      ponytails: "Queues de Cheval",
      wigs: "Perruques",
      company: "Entreprise",
      aboutUs: "À Propos de Nous",
      contact: "Contact",
      careers: "Carrières",
      press: "Presse",
      help: "Aide",
      shipping: "Informations de Livraison",
      returns: "Retours",
      faq: "FAQ",
      privacyPolicy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      copyright: "Tous droits réservés.",
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
    login: {
      title: "Se Connecter",
      emailLabel: "Adresse Courriel",
      emailPlaceholder: "Entrez votre courriel",
      passwordLabel: "Mot de Passe",
      passwordPlaceholder: "Entrez votre mot de passe",
      forgotPassword: "Mot de Passe Oublié?",
      submitButton: "Se Connecter",
      loggingIn: "Connexion...",
      or: "Ou",
      noAccount: "Vous n'avez pas de compte?",
      signupLink: "S'inscrire",
    },
    register: {
      title: "Créer un Compte",
      firstName: "Prénom",
      firstNamePlaceholder: "Entrez votre prénom",
      lastName: "Nom de Famille",
      lastNamePlaceholder: "Entrez votre nom de famille",
      emailLabel: "Adresse Courriel",
      emailPlaceholder: "Entrez votre courriel",
      passwordLabel: "Mot de Passe",
      passwordPlaceholder: "Créez un mot de passe",
      confirmPasswordLabel: "Confirmer le Mot de Passe",
      confirmPasswordPlaceholder: "Confirmez votre mot de passe",
      termsPrefix: "J'accepte les",
      termsLink: "Conditions d'Utilisation",
      and: "et",
      privacyLink: "Politique de Confidentialité",
      submitButton: "Créer un Compte",
      creatingAccount: "Création du Compte...",
      or: "Ou",
      alreadyAccount: "Vous avez déjà un compte?",
      loginLink: "Se connecter",
      errors: {
        passwordMismatch: "Les mots de passe ne correspondent pas",
        acceptTerms: "Vous devez accepter les conditions et la politique de confidentialité",
        default: "L'inscription a échoué. Veuillez réessayer.",
      },
    },
    wishlist: {
      title: "Ma Liste de Souhaits",
      loginToSave: "Connectez-vous pour Sauvegarder Vos Favoris",
      createAccount: "Créez un compte ou connectez-vous pour sauvegarder des produits dans votre liste de souhaits.",
      login: "Se Connecter",
      createAccountBtn: "Créer un Compte",
      empty: "Votre Liste de Souhaits est Vide",
      emptyDesc: "Commencez à ajouter des produits que vous aimez à votre liste de souhaits.",
      browseProducts: "Parcourir les Produits",
      itemsCount: "article",
      itemsCountPlural: "articles",
      inYourWishlist: "dans votre liste de souhaits",
      clearWishlist: "Vider la Liste de Souhaits",
      addToCart: "Ajouter au Panier",
      continueShopping: "Continuer les Achats",
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
    common: {
      language: "Langue",
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
      admin: "المدير",
      adminDashboard: "لوحة تحكم المدير",
      orders: "الطلبات",
      wishlist: "قائمة الأمنيات",
    },
    home: {
      title: "مرحباً بكم في متجرنا",
      subtitle: "اكتشف أفضل المنتجات بأفضل الأسعار.",
      shopNow: "تسوق الآن",
      learnMore: "اعرف المزيد",
      featuredProducts: "المنتجات المميزة",
      newArrivals: "الوافدين الجدد",
      bestSellers: "الأكثر مبيعاً",
      hero: {
        title: "غيري إطلالتك",
        subtitle: "وصلات شعر فاخرة",
        description: "اكتشفي مجموعتنا من وصلات الشعر الفاخرة المصممة لتعزيز جمالك الطبيعي بجودة فاخرة وراحة لا مثيل لها.",
        shopNow: "تسوق الآن",
        ourStory: "قصتنا",
      },
      whyChooseUs: {
        title: "لماذا تختارين",
        titleHighlight: "سلطانة هير",
        subtitle: "نحن ملتزمون بتقديم أعلى جودة من وصلات الشعر وخدمة استثنائية تتجاوز توقعاتك.",
        premiumQuality: {
          title: "جودة فاخرة",
          description: "وصلاتنا مصنوعة من شعر بشري ريمي 100%، مما يضمن مظهراً وملمساً طبيعياً ينسجم بسلاسة مع شعرك الطبيعي.",
        },
        ethicallySourced: {
          title: "مصدر أخلاقي",
          description: "نعمل مباشرة مع الموردين الذين يتبعون الممارسات الأخلاقية، مما يضمن تعويضاً عادلاً لمتبرعي الشعر.",
        },
        expertCraftsmanship: {
          title: "حرفية خبيرة",
          description: "كل وصلة مصنوعة بعناية من قبل حرفيين مهرة لديهم سنوات من الخبرة في تصنيع وصلات الشعر.",
        },
        fastShipping: {
          title: "شحن سريع",
          description: "احصلي على وصلاتك بسرعة مع خيارات الشحن السريع وشركاء التوصيل الموثوقين لدينا.",
        },
        colorPerfection: {
          title: "كمال اللون",
          description: "نظام مطابقة الألوان المتقدم لدينا يضمن أن وصلاتك تتطابق تماماً مع لون شعرك الطبيعي.",
        },
        expertSupport: {
          title: "دعم خبير",
          description: "متخصصو وصلات الشعر لدينا هنا لمساعدتك في اختيار الوصلات المثالية وتقديم نصائح التصفيف.",
        },
        cta: {
          title: "مستعدة لتغيير إطلالتك؟",
          description: "انضمي إلى آلاف العملاء الراضين الذين يثقون في سلطانة هير لاحتياجات وصلات الشعر.",
          shopExtensions: "تسوق الوصلات",
          learnMore: "اعرف المزيد",
        },
      },
      testimonials: {
        title: "ما يقوله عملاؤنا",
        subtitle: "لا تأخذي كلامنا فقط - اسمعي من عملائنا الراضين الذين غيروا إطلالتهم مع وصلات سلطانة هير.",
      },
      newsletter: {
        title: "ابقي على اطلاع",
        description: "اشتركي في نشرتنا الإخبارية للحصول على عروض حصرية ونصائح التصفيف وإعلانات المنتجات الجديدة.",
        placeholder: "أدخلي عنوان بريدك الإلكتروني",
        subscribe: "اشتراك",
        subscribing: "جاري الاشتراك...",
        success: "شكراً لك على الاشتراك! مرحباً بك في عائلة سلطانة هير.",
      },
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
      filters: "المرشحات",
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
    about: {
      title: "معلومات عنا",
      storyAlt: "قصتنا",
      ourStory: "قصتنا",
      ourStoryParagraph1: "تأسست بشغف للجمال والجودة، وقد كرسنا أنفسنا لتوفير وصلات الشعر المتميزة التي تعزز جمالك الطبيعي.",
      ourStoryParagraph2: "التزامنا بالتميز يدفعنا للبحث عن أفضل المواد فقط والعمل مع حرفيين مهرة لإنشاء منتجات تتجاوز التوقعات.",
      ourStoryParagraph3: "نحن نؤمن أن كل شخص يستحق أن يشعر بالثقة والجمال، ومنتجاتنا مصممة لمساعدتك في تحقيق ذلك بسهولة.",
      ourValues: "قيمنا",
      value: {
        quality: "الجودة",
        qualityDesc: "نستخدم فقط أفضل المواد والحرفية لضمان أن منتجاتنا تلبي أعلى المعايير.",
        ethics: "الأخلاق",
        ethicsDesc: "نحن ملتزمون بالمصادر الأخلاقية والممارسات المستدامة في جميع جوانب أعمالنا.",
        innovation: "الابتكار",
        innovationDesc: "نبتكر باستمرار لنجلب لك أحدث تقنيات وتصاميم وصلات الشعر.",
      },
      commitmentTitle: "التزامنا تجاهك",
      commitmentDesc: "نحن مكرسون لتقديم خدمة عملاء استثنائية ومنتجات تساعدك على أن تبدي وتشعري بأفضل حال كل يوم.",
      joinFamilyTitle: "انضمي إلى عائلتنا",
      joinFamilyDesc: "كوني جزءاً من مجتمعنا واكتشفي الفرق الذي يمكن أن تحدثه الجودة والعناية.",
      shopCollection: "تسوقي مجموعتنا",
    },
    contact: {
      title: "اتصل بنا",
      getInTouch: "تواصل معنا",
      getInTouchDesc: "نحب أن نسمع منك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.",
      phone: "الهاتف",
      phoneHours: "الاثنين إلى الجمعة، 9 صباحاً إلى 6 مساءً بتوقيت شرق الولايات المتحدة",
      email: "البريد الإلكتروني",
      emailDesc: "سنرد خلال 24 ساعة",
      address: "العنوان",
      businessHours: "ساعات العمل",
      businessDay: "الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً",
      businessSat: "السبت: 10:00 صباحاً - 4:00 مساءً",
      businessSun: "الأحد: مغلق",
      sendMessage: "أرسل لنا رسالة",
      yourName: "اسمك",
      yourNamePlaceholder: "أدخل اسمك الكامل",
      emailLabel: "عنوان البريد الإلكتروني",
      emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
      subject: "الموضوع",
      subjectPlaceholder: "ما هو موضوع رسالتك؟",
      message: "الرسالة",
      messagePlaceholder: "أخبرنا كيف يمكننا مساعدتك...",
      sending: "جاري الإرسال...",
      sendButton: "إرسال الرسالة",
      faqTitle: "الأسئلة الشائعة",
      faq1q: "كم تدوم وصلات الشعر؟",
      faq1a: "مع العناية المناسبة، يمكن أن تدوم وصلات الشعر المتميزة لدينا من 6-12 شهراً حسب الاستخدام والصيانة.",
      faq2q: "كيف أختار اللون المناسب؟",
      faq2a: "نوصي باستخدام دليل مطابقة الألوان الخاص بنا أو الاتصال بخبرائنا للحصول على استشارة ألوان شخصية.",
      faq3q: "هل يمكنني تصفيف الوصلات بالحرارة؟",
      faq3a: "نعم! يمكن تصفيف وصلات الشعر البشري الخاصة بنا بأدوات الحرارة تماماً مثل شعرك الطبيعي. نوصي باستخدام واقي الحرارة.",
      faq4q: "ما هي سياسة الإرجاع الخاصة بكم؟",
      faq4a: "نقدم سياسة إرجاع لمدة 30 يوماً للمنتجات غير المستخدمة في العبوة الأصلية. المنتجات ذات الألوان المخصصة للبيع النهائي.",
    },
    instagram: {
      followUs: "تابعونا على إنستغرام",
      handle: "@soltanahair",
    },
    footer: {
      brand: {
        description: "وصلات شعر فاخرة مصممة لتعزيز جمالك الطبيعي بجودة فاخرة وراحة لا مثيل لها.",
      },
      shop: "المتجر",
      allProducts: "جميع المنتجات",
      clipIns: "وصلات بالكليبس",
      tapeIns: "وصلات لاصقة",
      ponytails: "ذيل الحصان",
      wigs: "الباروكات",
      company: "الشركة",
      aboutUs: "معلومات عنا",
      contact: "اتصل بنا",
      careers: "الوظائف",
      press: "الصحافة",
      help: "المساعدة",
      shipping: "معلومات الشحن",
      returns: "الإرجاع",
      faq: "الأسئلة الشائعة",
      privacyPolicy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      copyright: "جميع الحقوق محفوظة.",
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
    login: {
      title: "تسجيل الدخول",
      emailLabel: "عنوان البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      forgotPassword: "هل نسيت كلمة المرور؟",
      submitButton: "تسجيل الدخول",
      loggingIn: "جاري تسجيل الدخول...",
      or: "أو",
      noAccount: "ليس لديك حساب؟",
      signupLink: "سجل",
    },
    register: {
      title: "إنشاء حساب",
      firstName: "الاسم الأول",
      firstNamePlaceholder: "أدخل اسمك الأول",
      lastName: "اسم العائلة",
      lastNamePlaceholder: "أدخل اسم العائلة",
      emailLabel: "عنوان البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "إنشاء كلمة مرور",
      confirmPasswordLabel: "تأكيد كلمة المرور",
      confirmPasswordPlaceholder: "تأكيد كلمة المرور",
      termsPrefix: "أوافق على",
      termsLink: "شروط الخدمة",
      and: "و",
      privacyLink: "سياسة الخصوصية",
      submitButton: "إنشاء حساب",
      creatingAccount: "جاري إنشاء الحساب...",
      or: "أو",
      alreadyAccount: "لديك حساب بالفعل؟",
      loginLink: "تسجيل الدخول",
      errors: {
        passwordMismatch: "كلمات المرور غير متطابقة",
        acceptTerms: "يجب قبول الشروط وسياسة الخصوصية",
        default: "فشل في التسجيل. يرجى المحاولة مرة أخرى.",
      },
    },
    wishlist: {
      title: "قائمة أمنياتي",
      loginToSave: "سجل الدخول لحفظ المفضلة",
      createAccount: "أنشئ حساباً أو سجل الدخول لحفظ المنتجات في قائمة أمنياتك.",
      login: "تسجيل الدخول",
      createAccountBtn: "إنشاء حساب",
      empty: "قائمة أمنياتك فارغة",
      emptyDesc: "ابدأ بإضافة المنتجات التي تحبها إلى قائمة أمنياتك.",
      browseProducts: "تصفح المنتجات",
      itemsCount: "عنصر",
      itemsCountPlural: "عناصر",
      inYourWishlist: "في قائمة أمنياتك",
      clearWishlist: "مسح قائمة الأمنيات",
      addToCart: "أضف إلى السلة",
      continueShopping: "متابعة التسوق",
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
    common: {
      language: "اللغة",
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
        return key; // Return the key itself if translation is not found
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
