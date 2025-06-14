
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success(t('home.newsletter.success'));
    }, 1000);
  };

  return (
    <section className="py-12 md:py-16 bg-soltana-neutral/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
            {t('home.newsletter.title')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('home.newsletter.description')}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={t('home.newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button 
              type="submit" 
              className="bg-soltana-dark text-white hover:bg-black"
              disabled={loading}
            >
              {loading ? t('home.newsletter.subscribing') : t('home.newsletter.subscribe')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
