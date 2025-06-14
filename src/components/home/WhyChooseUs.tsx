
import React from "react";
import { Shield, Heart, Award, Truck, Sparkles, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in group"
      style={{ animationDelay: delay }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-soltana-blush to-soltana-peach rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <div className="text-soltana-dark">
            {icon}
          </div>
        </div>
        <h3 className="font-serif text-lg font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Shield size={24} />,
      title: t('home.whyChooseUs.premiumQuality.title'),
      description: t('home.whyChooseUs.premiumQuality.description'),
      delay: "0.1s",
    },
    {
      icon: <Heart size={24} />,
      title: t('home.whyChooseUs.ethicallySourced.title'),
      description: t('home.whyChooseUs.ethicallySourced.description'),
      delay: "0.2s",
    },
    {
      icon: <Award size={24} />,
      title: t('home.whyChooseUs.expertCraftsmanship.title'),
      description: t('home.whyChooseUs.expertCraftsmanship.description'),
      delay: "0.3s",
    },
    {
      icon: <Truck size={24} />,
      title: t('home.whyChooseUs.fastShipping.title'),
      description: t('home.whyChooseUs.fastShipping.description'),
      delay: "0.4s",
    },
    {
      icon: <Sparkles size={24} />,
      title: t('home.whyChooseUs.colorPerfection.title'),
      description: t('home.whyChooseUs.colorPerfection.description'),
      delay: "0.5s",
    },
    {
      icon: <Users size={24} />,
      title: t('home.whyChooseUs.expertSupport.title'),
      description: t('home.whyChooseUs.expertSupport.description'),
      delay: "0.6s",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-soltana-light to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-soltana-blush/20 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-soltana-peach/20 rounded-full blur-3xl translate-x-20 translate-y-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 animate-fade-in">
            {t('home.whyChooseUs.title')} <span className="text-primary">{t('home.whyChooseUs.titleHighlight')}</span>?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t('home.whyChooseUs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="bg-gradient-to-r from-soltana-blush/30 to-soltana-peach/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
              {t('home.whyChooseUs.cta.title')}
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              {t('home.whyChooseUs.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 bg-soltana-dark text-white font-medium rounded-lg hover:bg-black transition-colors shadow-md hover:shadow-lg"
              >
                {t('home.whyChooseUs.cta.shopExtensions')}
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-soltana-dark text-soltana-dark font-medium rounded-lg hover:bg-soltana-dark hover:text-white transition-colors"
              >
                {t('home.whyChooseUs.cta.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
