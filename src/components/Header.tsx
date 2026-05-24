'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const WHATSAPP_URL = 'https://wa.me/message/HPPZ5X6XZSMLM1';

const serviceLinks = [
  { key: 'gacc', href: '/services/gacc/', emoji: '📋' },
  { key: 'label', href: '/services/label/', emoji: '🏷️' },
  { key: 'ccc', href: '/services/ccc/', emoji: '✅' },
  { key: 'cosmetics', href: '/services/cosmetics/', emoji: '💄' },
  { key: 'ecommerce', href: '/services/ecommerce/', emoji: '🌐' },
  { key: 'brand', href: '/services/brand/', emoji: '🛡️' },
];

const industries = [
  { slug: 'dairy-milk-products', emoji: '🥛' },
  { slug: 'meat-seafood', emoji: '🥩' },
  { slug: 'wine-spirits', emoji: '🍷' },
  { slug: 'skincare-cosmetics', emoji: '💄' },
  { slug: 'pet-food', emoji: '🐾' },
  { slug: 'health-supplements', emoji: '💊' },
  { slug: 'baby-maternal', emoji: '👶' },
  { slug: 'consumer-electronics', emoji: '📱' },
  { slug: 'medical-devices', emoji: '🏥' },
  { slug: 'crossborder-ecommerce', emoji: '🛒' },
];

const BASE = 'https://sinotradecompliance.com';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-primary-navy/95 backdrop-blur-sm shadow-md">
      {/* 第一行：Logo + WhatsApp */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-white font-bold text-lg sm:text-xl">
            {t('logo')}
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-3 py-1.5 rounded-md transition-all hover:shadow-md text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t('whatsapp')}</span>
            </a>
            <a
              href={`${BASE}/en/quote/`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-3 py-1.5 rounded-md text-sm transition-all hover:shadow-md"
            >
              {t('quote')}
            </a>
          </div>
        </div>
      </div>

      {/* 第二行：导航菜单 */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 桌面端：单行 */}
          <div className="hidden md:flex items-center justify-center h-12 space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {t('services')}
                <ChevronDown className="w-3 h-3" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg py-2 z-50 max-h-[32rem] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4AF37 #f1f1f1' }}>
                  {serviceLinks.map((s) => (
                    <a
                      key={s.key}
                      href={`${BASE}/en${s.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-navy transition-colors"
                    >
                      {s.emoji} {t(`servicesDropdown.${s.key}`)}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {t('industries')}
                <ChevronDown className="w-3 h-3" />
              </button>
              {industriesOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg py-2 z-50 max-h-[32rem] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4AF37 #f1f1f1' }}>
                  {industries.map((ind) => (
                    <a
                      key={ind.slug}
                      href={`${BASE}/en/industries/${ind.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-navy transition-colors"
                    >
                      {ind.emoji} {t(`industriesDropdown.${ind.slug.replace(/-/g, '')}`)}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href={`${BASE}/en/about/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('about')}
            </a>
            <a href={`${BASE}/en/packages/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('packages')}
            </a>
            <a href={`${BASE}/en/faq/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('faq')}
            </a>
            <a href={`${BASE}/en/blog/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('blog')}
            </a>
            <LanguageSwitcher />
          </div>

          {/* 手机端：flex-wrap 允许换行 */}
          <div className="md:hidden flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-sm">
            <a href={`${BASE}/en/services/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('services')}
            </a>
            <a href={`${BASE}/en/industries/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('industries')}
            </a>
            <a href={`${BASE}/en/about/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('about')}
            </a>
            <a href={`${BASE}/en/packages/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('packages')}
            </a>
            <a href={`${BASE}/en/faq/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('faq')}
            </a>
            <a href={`${BASE}/en/blog/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('blog')}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

    </nav>
  );
}
