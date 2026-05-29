'use client';

import { useState, useEffect } from 'react';
import { defaultLocale, locales } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

const STORAGE_KEY = 'compli-service-locale';

/** 从 URL 路径 /{locale}/compli-service/... 推断语言 */
function detectLocaleFromPath(): Locale | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\/compli-service\//);
  if (match && locales.includes(match[1] as Locale)) {
    return match[1] as Locale;
  }
  return null;
}

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  // 1) 优先 URL 路径推断（当前页面的语言最准确）
  const fromPath = detectLocaleFromPath();
  if (fromPath) return fromPath;
  // 2) 后备：localStorage（用户历史偏好）
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }
  return defaultLocale;
}

export function setStoredLocale(locale: string): void {
  localStorage.setItem(STORAGE_KEY, locale);
}

export default function useClientLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const detected = getStoredLocale();
    setLocale(detected);
    // 同步到 localStorage，确保 LanguageSwitcher 下次优先使用 URL 语言
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== detected) {
      localStorage.setItem(STORAGE_KEY, detected);
    }
  }, []);

  return locale;
}
