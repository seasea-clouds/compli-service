'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/message/HPPZ5X6XZSMLM1';
const BASE = 'https://sinotradecompliance.com';

const serviceLinks = [
  { key: 'gaccRegistration', href: '/services/gacc/' },
  { key: 'labelCompliance', href: '/services/label/' },
  { key: 'cccCertification', href: '/services/ccc/' },
  { key: 'cosmeticsFiling', href: '/services/cosmetics/' },
  { key: 'crossBorderEcommerce', href: '/services/ecommerce/' },
  { key: 'brandProtection', href: '/services/brand/' },
];

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  return (
    <footer className="bg-primary-navy py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">{t('services')}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.key}>
                  <a
                    href={`${BASE}/${locale}${s.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {t(s.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a href={`${BASE}/${locale}/about/`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  {t('about')}
                </a>
              </li>
              <li>
                <a href={`${BASE}/${locale}/packages/`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  {t('packages')}
                </a>
              </li>
              <li>
                <a href={`${BASE}/${locale}/industries/`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  {t('industries')}
                </a>
              </li>
              <li>
                <a href={`${BASE}/${locale}/blog/`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  {t('blog')}
                </a>
              </li>
              <li>
                <a href={`${BASE}/${locale}/faq/`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">
                  {t('faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-4">{t('contact')}</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:david@sinotradecompliance.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-white/70" />
                <span>david@sinotradecompliance.com</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 text-white/70" />
                <span>{t('whatsapp')}</span>
              </a>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-white/70" />
                <span>{t('address')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-white/60 text-sm mb-4">{t('rights')}</p>
          <p className="text-center text-white/40 text-xs max-w-2xl mx-auto">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
