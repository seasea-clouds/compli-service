'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { MessageCircle, ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_URL } from '@/lib/constants';
import LanguageSwitcher from './LanguageSwitcher';
import { industries } from '@/data/industries';

const serviceLinks = [
  { key: 'gacc', href: '/services/gacc/', emoji: '📋' },
  { key: 'label', href: '/services/label/', emoji: '🏷️' },
  { key: 'ccc', href: '/services/ccc/', emoji: '✅' },
  { key: 'cosmetics', href: '/services/cosmetics/', emoji: '💄' },
  { key: 'ecommerce', href: '/services/ecommerce/', emoji: '🌐' },
  { key: 'brand', href: '/services/brand/', emoji: '🛡️' },
];

export default function Navbar({ onSearchOpen }: { onSearchOpen: () => void }) {
  const t = useTranslations('Navbar');
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'en';
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-primary-navy/95 backdrop-blur-sm shadow-md">
      {/* 第一行：Logo + WhatsApp */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href={`/${locale}/`} className="text-white font-bold text-lg sm:text-xl">
            {t('logo')}
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSearchOpen}
              className="p-2 text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-3 py-1.5 rounded-md transition-all hover:shadow-md text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t('whatsapp')}</span>
            </a>
            <Link href={`/${locale}/quote/`} className="bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-3 py-1.5 rounded-md text-sm transition-all hover:shadow-md">
              {t('quote')}
            </Link>
            <a
              href="https://compli-service.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold/90 text-primary-navy font-semibold px-3 py-1.5 rounded-md text-sm transition-all hover:shadow-md"
            >
              {t('freeCheck')}
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
                    <Link
                      key={s.key}
                      href={`/${locale}${s.href}`}
                      className="block px-4 py-2 text-sm text-text-charcoal hover:bg-bg-ice hover:text-primary-navy transition-colors"
                    >
                      {s.emoji} {t(`servicesDropdown.${s.key}`)}
                    </Link>
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
                    <Link
                      key={ind.slug}
                      href={`/${locale}/industries/${ind.slug}/`}
                      className="block px-4 py-2 text-sm text-text-charcoal hover:bg-bg-ice hover:text-primary-navy transition-colors"
                    >
                      {ind.emoji} {t(`industriesDropdown.${ind.slug.replace(/-/g, '')}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/${locale}/about/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('about')}
            </Link>
            <Link href={`/${locale}/packages/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('packages')}
            </Link>
            <Link href={`/${locale}/faq/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('faq')}
            </Link>
            <Link href={`/${locale}/blog/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm font-medium">
              {t('blog')}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* 手机端：flex-wrap 允许换行 */}
          <div className="md:hidden flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-sm">
            <Link href={`/${locale}/services/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('services')}
            </Link>
            <Link href={`/${locale}/industries/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('industries')}
            </Link>
            <Link href={`/${locale}/about/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('about')}
            </Link>
            <Link href={`/${locale}/packages/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('packages')}
            </Link>
            <Link href={`/${locale}/faq/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('faq')}
            </Link>
            <Link href={`/${locale}/blog/`} className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              {t('blog')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

    </nav>
  );
}
