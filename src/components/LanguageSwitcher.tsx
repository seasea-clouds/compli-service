'use client';

import { locales, localeNames } from '@/i18n/routing';
import { useEffect, useState } from 'react';
import { getStoredLocale, setStoredLocale } from '@/lib/useClientLocale';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(getStoredLocale());
    setMounted(true);
  }, []);

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    setStoredLocale(newLocale);
    window.location.reload();
  };

  return (
    <div className="relative group">
      <button type="button" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm">
        <span className="text-base">🌐</span>
        <span className="hidden sm:inline">{mounted ? localeNames[locale as keyof typeof localeNames]?.split(' ').slice(1).join(' ') : 'English'}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 top-full bg-white rounded-md shadow-lg border border-gray-200 pt-2 pb-1 min-w-[140px] max-h-[32rem] overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4AF37 #f1f1f1' }}>
        {locales.map((l) => (
          <button
            type="button"
            key={l}
            onClick={() => handleChange(l)}
            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 transition-colors ${
              l === locale ? 'bg-primary-navy/10 font-semibold' : ''
            }`}
          >
            {localeNames[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
