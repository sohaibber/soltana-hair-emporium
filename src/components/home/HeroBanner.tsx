
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const HeroBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-soltana-blush/20 to-soltana-peach/20 dark:from-gray-900/80 dark:to-gray-800/80 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-1 order-2">
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-4 animate-fade-in text-gray-900 dark:text-white">
              {t('home.hero.title')} <br />
              <span className="text-primary">{t('home.hero.subtitle')}</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg md:pr-12 animate-fade-in transition-colors duration-300" style={{ animationDelay: "0.2s" }}>
              {t('home.hero.description')}
            </p>
            <div className="space-x-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200">
                <Link to="/shop">
                  {t('home.hero.shopNow')}
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-200">
                <Link to="/about">
                  {t('home.hero.ourStory')}
                </Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop"
                alt="Woman with beautiful hair extensions"
                className="object-cover w-full h-full animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                <div className="text-white font-medium text-sm md:text-base animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  Featured: Premium Clip-in Extensions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-soltana-gold/30 dark:bg-primary/20 rounded-full blur-3xl transition-colors duration-300"></div>
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-soltana-blush/30 dark:bg-primary/10 rounded-full blur-3xl transition-colors duration-300"></div>
    </div>
  );
};

export default HeroBanner;
