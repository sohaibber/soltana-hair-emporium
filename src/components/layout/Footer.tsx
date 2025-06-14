
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-soltana-light border-t border-soltana-neutral/10 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="font-serif font-bold text-2xl text-soltana-dark mb-4">
              Soltana<span className="text-primary">Hair</span>
            </div>
            <p className="text-gray-600 mb-4">
              {t('footer.brand.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.shop')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.allProducts')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=clip-ins" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.clipIns')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=tape-ins" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.tapeIns')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=ponytails" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.ponytails')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=wigs" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.wigs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.careers')}
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.press')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.help')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} SoltanaHair. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
