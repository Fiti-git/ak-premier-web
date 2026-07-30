'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: 'en' | 'es') => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-navy/15 bg-white/80 backdrop-blur px-1 py-1 text-xs font-medium"
      aria-label="Language switcher"
      data-pending={isPending}
    >
      {(['en', 'es'] as const).map((lng) => (
        <button
          key={lng}
          onClick={() => switchTo(lng)}
          className={`px-3 py-1 rounded-full transition-colors ${
            locale === lng
              ? 'bg-navy text-white'
              : 'text-navy/70 hover:text-navy'
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
