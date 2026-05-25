'use client';

import { useState, useEffect } from 'react';
import { defaultLocale } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

const STORAGE_KEY = 'compli-service-locale';

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  return (localStorage.getItem(STORAGE_KEY) || defaultLocale) as Locale;
}

export function setStoredLocale(locale: string): void {
  localStorage.setItem(STORAGE_KEY, locale);
}

export default function useClientLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocale(getStoredLocale());
  }, []);

  return locale;
}
