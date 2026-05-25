'use client';

import { useState, useEffect, ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { defaultLocale } from '@/i18n/routing';
import { messagesMap } from '@/i18n/messages';
import { getStoredLocale } from '@/lib/useClientLocale';

const STORAGE_KEY = 'compli…cale';

interface Props {
  children: ReactNode;
  /** Server‑side messages (fallback before client hydration) */
  serverMessages: Record<string, unknown>;
}

export default function ClientLocaleProvider({ children, serverMessages }: Props) {
  const [locale, setLocale] = useState(defaultLocale);
  const [messages, setMessages] = useState<Record<string, unknown>>(serverMessages);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getStoredLocale();
    setLocale(stored);
    setMessages(messagesMap[stored] || serverMessages);
    setReady(true);
  }, [serverMessages]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC" now={ready ? new Date() : undefined}>
      {children}
    </NextIntlClientProvider>
  );
}
