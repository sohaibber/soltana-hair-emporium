import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-8 text-center">{t("contact.title")}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="font-serif text-2xl font-semibold mb-6">{t("contact.getInTouch")}</h2>
            <p className="text-gray-700 mb-8">
              {t("contact.getInTouchDesc")}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{t("contact.phone")}</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600 text-sm">{t("contact.phoneHours")}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{t("contact.email")}</h3>
                  <p className="text-gray-600">info@soltanahair.com</p>
                  <p className="text-gray-600 text-sm">{t("contact.emailDesc")}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{t("contact.address")}</h3>
                  <p className="text-gray-600">123 Beauty Lane</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{t("contact.businessHours")}</h3>
                  <p className="text-gray-600">{t("contact.businessDay")}</p>
                  <p className="text-gray-600">{t("contact.businessSat")}</p>
                  <p className="text-gray-600">{t("contact.businessSun")}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-serif text-xl font-semibold mb-4">{t("contact.sendMessage")}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.yourName")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("contact.yourNamePlaceholder")}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.emailLabel")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("contact.emailPlaceholder")}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.subject")}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t("contact.subjectPlaceholder")}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("contact.message")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("contact.messagePlaceholder")}
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-soltana-dark hover:bg-black" disabled={isSubmitting}>
                      {isSubmitting ? t("contact.sending") : t("contact.sendButton")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-semibold mb-6 text-center">{t("contact.faqTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{t("contact.faq1q")}</h3>
                <p className="text-gray-600">
                  {t("contact.faq1a")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{t("contact.faq2q")}</h3>
                <p className="text-gray-600">
                  {t("contact.faq2a")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{t("contact.faq3q")}</h3>
                <p className="text-gray-600">
                  {t("contact.faq3a")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium text-lg mb-2">{t("contact.faq4q")}</h3>
                <p className="text-gray-600">
                  {t("contact.faq4a")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

// NOTE: Contact.tsx is getting long; please consider refactoring!
