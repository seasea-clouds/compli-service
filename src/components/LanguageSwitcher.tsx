'use client';

import { useLocale } from 'next-intl';
import { locales, localeNames } from '@/i18n/routing';
import { useState, useRef, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const mountedRef = useRef(false);
  const [rendered, setRendered] = useState(false);
  const router = useRouter();

  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    mountedRef.current = true;
    setRendered(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Static export: change path directly
  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const path = window.location.pathname;
    // Replace locale in path
    const newPath = path.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
  };

  if (!rendered) return null;

  return (
    <div className="relative group">
      <button type="button" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm">
        <span className="text-base">🌐</span>
        <span className="hidden sm:inline">{localeNames[locale as keyof typeof localeNames]?.split(' ').slice(1).join(' ')}</span>
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
