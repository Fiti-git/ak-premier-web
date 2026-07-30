'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Newsletter() {
  const t = useTranslations('newsletter');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 700));
    setStatus('success');
  };

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.16em] text-forest-100 mb-4 font-semibold">
        {t('title')}
      </div>
      <p className="text-sm text-white/60 mb-4 leading-relaxed max-w-sm">
        {t('subtitle')}
      </p>
      {status === 'success' ? (
        <div className="text-sm text-forest-100 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center text-xs">✓</span>
          {t('success')}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            required
            type="email"
            name="email"
            placeholder={t('email')}
            className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 px-4 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/30 transition-all"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-forest hover:bg-forest-700 text-white px-4 py-2.5 text-sm font-medium disabled:opacity-60 transition-colors"
          >
            {status === 'sending' ? '…' : t('submit')}
          </button>
        </form>
      )}
    </div>
  );
}
