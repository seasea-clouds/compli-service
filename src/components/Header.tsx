'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

const WHATSAPP_URL = 'https://wa.me/message/HPPZ5X6XZSMLM1';

const serviceLinks = [
  { key: 'gacc', href: '/check/gacc', emoji: '📋' },
  { key: 'label', href: '/check/label', emoji: '🏷️' },
  { key: 'ccc', href: '/check/ccc', emoji: '✅' },
  { key: 'cosmetics', href: '/check/cosmetics', emoji: '💄' },
  { key: 'ecommerce', href: '/check/ecommerce', emoji: '🌐' },
  { key: 'brand', href: '/check/trademark', emoji: '🛡️' },
];

export default function Header() {
  const t = useTranslations('Navbar');
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-primary-navy/95 backdrop-blur-sm shadow-md">
      {/* 第一行：Logo + 操作按钮 */}
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.032 21.965c-1.717 0-3.396-.355-4.918-1.055l-4.835 1.567 1.586-4.73c-.712-1.517-1.072-3.196-1.072-4.918 0-5.523 4.504-10.029 10.029-10.029 2.687 0 5.207 1.044 7.103 2.942 1.896 1.896 2.94 4.418 2.94 7.106 0 5.524-4.504 10.117-10.833 10.117zm0-18.458c-4.413 0-8.029 3.614-8.029 8.029 0 1.674.496 3.294 1.431 4.666l-.925 2.759 2.848-.924c1.33.839 2.87 1.274 4.45 1.274 4.413 0 8.117-3.614 8.117-8.029 0-2.148-.835-4.165-2.356-5.686s-3.54-2.089-5.536-2.089z"/>
              </svg>
              <span className="hidden sm:inline">{t('whatsapp')}</span>
            </a>
            <Link
              href="/pricing"
              className="bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-3 py-1.5 rounded-md text-sm transition-all hover:shadow-md"
            >
              {t('pricing')}
            </Link>
            <a
              href="https://sinotradecompliance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors text-xs ml-1"
            >
              {t('mainSite')}
            </a>
          </div>
        </div>
      </div>

      {/* 第二行：导航菜单 */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 桌面端 */}
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
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg py-2 z-50 max-h-[32rem] overflow-y-auto"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4AF37 #f1f1f1' }}
                >
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.key}
                      href={s.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-navy transition-colors"
                    >
                      {s.emoji} {t(`servicesDropdown.${s.key}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pricing" className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('pricing')}
            </Link>

            <a
              href="https://sinotradecompliance.com/en/services/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              {t('allServices')}
            </a>
            <a
              href="https://sinotradecompliance.com/en/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              {t('about')}
            </a>
            <a
              href="https://sinotradecompliance.com/en/faq/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              {t('faq')}
            </a>
            <a
              href="https://sinotradecompliance.com/en/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              {t('blog')}
            </a>
            <LanguageSwitcher />
          </div>

          {/* 手机端 */}
          <div className="md:hidden flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-sm">
            <Link href="/pricing" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('pricing')}
            </Link>
            <a href="https://sinotradecompliance.com/en/services/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('allServices')}
            </a>
            <a href="https://sinotradecompliance.com/en/about/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('about')}
            </a>
            <a href="https://sinotradecompliance.com/en/faq/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('faq')}
            </a>
            <a href="https://sinotradecompliance.com/en/blog/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('blog')}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
