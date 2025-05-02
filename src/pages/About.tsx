
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8 text-center">About SoltanaHair</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="flex items-center">
            <img 
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop" 
              alt="SoltanaHair Story" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              SoltanaHair was founded in 2018 with a simple mission: to provide high-quality, 
              ethically sourced hair extensions that help women feel confident and beautiful. 
              Our founder, Amina, struggled for years to find extensions that matched her hair 
              texture and color perfectly without damaging her natural hair.
            </p>
            <p className="text-gray-700 mb-4">
              After years of research and development, working with experts in the field, SoltanaHair 
              was born. Today, we're proud to offer premium hair extensions crafted from 100% Remy human 
              hair, ensuring a natural look and feel that seamlessly blends with your own hair.
            </p>
            <p className="text-gray-700">
              Our commitment to quality, ethics, and customer satisfaction has made us a trusted name 
              in the beauty industry, with thousands of satisfied customers across the globe.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-xl mb-2">Quality</h3>
                <p className="text-gray-600">
                  We source only the finest 100% Remy human hair for our extensions, ensuring durability, 
                  natural appearance, and ease of styling.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-xl mb-2">Ethics</h3>
                <p className="text-gray-600">
                  We ensure fair compensation for hair donors and maintain ethical sourcing practices 
                  throughout our supply chain.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-xl mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously research and develop new techniques for more comfortable, 
                  natural-looking, and damage-free extensions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-semibold mb-6 text-center">Our Commitment to You</h2>
          <div className="bg-soltana-light p-6 md:p-10 rounded-lg">
            <p className="text-center text-gray-700 max-w-3xl mx-auto">
              At SoltanaHair, we're committed to helping you look and feel your best. We offer personalized 
              consultations, expert advice, and a 30-day satisfaction guarantee on all our products. 
              Our customer service team is always ready to assist you with any questions or concerns.
            </p>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-2xl font-semibold mb-6">Join the SoltanaHair Family</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            Thousands of women around the world have transformed their look with SoltanaHair extensions. 
            Browse our collection today and discover the perfect match for your hair.
          </p>
          <a href="/shop" className="inline-block bg-soltana-dark text-white px-6 py-3 rounded-md hover:bg-black transition-colors">
            Shop Our Collection
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default About;
