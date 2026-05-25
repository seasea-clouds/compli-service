'use client';

import { useTranslations } from 'next-intl';
import useClientLocale from '@/lib/useClientLocale';

export default function ExpertCta() {
  const t = useTranslations('Check');
  const locale = useClientLocale();
  const href = (path: string) => `/${locale}${path}`;

  return (
    <div className="bg-primary-navy text-white rounded-lg p-8 text-center mt-8">
      <h3 className="text-xl font-bold mb-2">
        💼 {t('expertCtaTitle')}
      </h3>
      <p className="text-white/80 mb-6 max-w-lg mx-auto">
        {t('expertCtaDesc')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={href('/quote/')}
          className="bg-gold hover:bg-gold/90 text-primary-navy font-semibold px-6 py-3 rounded-md transition-all"
        >
          {t('expertCtaBtn')}
        </a>
      </div>
      <p className="text-white/60 text-sm mt-3">
        {t('expertCtaPrice')}
      </p>
    </div>
  );
}
