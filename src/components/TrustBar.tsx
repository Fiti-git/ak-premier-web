'use client';

import { useTranslations } from 'next-intl';

export default function TrustBar() {
  const t = useTranslations('trust');
  const items = t.raw('items') as string[];
  const doubled = [...items, ...items];

  return (
    <section className="py-10 sm:py-12 border-y border-navy/10 bg-white/50 overflow-hidden" aria-label={t('eyebrow')}>
      <div className="container-x mb-6">
        <div className="eyebrow text-center justify-center flex">{t('eyebrow')}</div>
      </div>
      <div className="marquee">
        <div>
          {doubled.map((item, i) => (
            <div
              key={i}
              className="font-display text-2xl sm:text-3xl text-navy/40 whitespace-nowrap flex items-center gap-12"
            >
              <span>{item}</span>
              <span className="text-forest">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
