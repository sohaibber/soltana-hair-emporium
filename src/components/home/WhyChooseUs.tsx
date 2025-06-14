
import React from "react";
import { Shield, Heart, Award, Truck, Sparkles, Users } from "lucide-react";

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
  const features = [
    {
      icon: <Shield size={24} />,
      title: "Premium Quality",
      description: "100% Remy human hair extensions sourced ethically and crafted with precision for lasting beauty.",
      delay: "0.1s",
    },
    {
      icon: <Heart size={24} />,
      title: "Ethically Sourced",
      description: "We partner with ethical suppliers to ensure our hair extensions are responsibly sourced and fairly traded.",
      delay: "0.2s",
    },
    {
      icon: <Award size={24} />,
      title: "Expert Craftsmanship",
      description: "Each extension is carefully crafted by skilled artisans to ensure perfect color matching and seamless blending.",
      delay: "0.3s",
    },
    {
      icon: <Truck size={24} />,
      title: "Fast & Free Shipping",
      description: "Enjoy complimentary shipping on orders over $150 with secure packaging and tracking included.",
      delay: "0.4s",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Color Perfection",
      description: "Our advanced color-matching technology ensures your extensions blend seamlessly with your natural hair.",
      delay: "0.5s",
    },
    {
      icon: <Users size={24} />,
      title: "Expert Support",
      description: "Our beauty consultants provide personalized advice to help you choose the perfect extensions for your style.",
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
            Why Choose <span className="text-primary">SoltanaHair</span>?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            We're committed to providing the highest quality hair extensions with exceptional service. 
            Here's what makes us different from the rest.
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
              Ready to Transform Your Look?
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              Join thousands of satisfied customers who have discovered the SoltanaHair difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 bg-soltana-dark text-white font-medium rounded-lg hover:bg-black transition-colors shadow-md hover:shadow-lg"
              >
                Shop Extensions
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-soltana-dark text-soltana-dark font-medium rounded-lg hover:bg-soltana-dark hover:text-white transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
