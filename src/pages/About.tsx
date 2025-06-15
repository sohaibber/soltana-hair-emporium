
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8 text-center">
          {t("about.title")}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="flex items-center">
            <img 
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop" 
              alt={t("about.storyAlt")}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">{t("about.ourStory")}</h2>
            <p className="text-gray-700 mb-4">
              {t("about.ourStoryParagraph1")}
            </p>
            <p className="text-gray-700 mb-4">
              {t("about.ourStoryParagraph2")}
            </p>
            <p className="text-gray-700">
              {t("about.ourStoryParagraph3")}
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-semibold mb-6 text-center">{t("about.ourValues")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-xl mb-2">{t("about.value.quality")}</h3>
                <p className="text-gray-600">
                  {t("about.value.qualityDesc")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-xl mb-2">{t("about.value.ethics")}</h3>
                <p className="text-gray-600">
                  {t("about.value.ethicsDesc")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-xl mb-2">{t("about.value.innovation")}</h3>
                <p className="text-gray-600">
                  {t("about.value.innovationDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-semibold mb-6 text-center">{t("about.commitmentTitle")}</h2>
          <div className="bg-soltana-light p-6 md:p-10 rounded-lg">
            <p className="text-center text-gray-700 max-w-3xl mx-auto">
              {t("about.commitmentDesc")}
            </p>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-2xl font-semibold mb-6">{t("about.joinFamilyTitle")}</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            {t("about.joinFamilyDesc")}
          </p>
          <a href="/shop" className="inline-block bg-soltana-dark text-white px-6 py-3 rounded-md hover:bg-black transition-colors">
            {t("about.shopCollection")}
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default About;
