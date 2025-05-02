
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryBanner from "@/components/home/CategoryBanner";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroBanner />
      <FeaturedProducts />
      <CategoryBanner />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </Layout>
  );
};

export default Index;
