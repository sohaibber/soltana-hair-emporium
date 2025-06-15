
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
    <section className="py-12 md:py-16 bg-muted/30 dark:bg-muted/10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4 text-foreground">
            {t('home.newsletter.title')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('home.newsletter.description')}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder={t('home.newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow bg-background border-border"
            />
            <Button 
              type="submit" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
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
