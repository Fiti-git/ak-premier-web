'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const SERVICE_KEYS = ['valetTrash', 'valetRecycling', 'bulk', 'powerWash', 'multiple', 'other'] as const;
const PROPERTY_KEYS = ['garden', 'midRise', 'highRise', 'hoa', 'mixed', 'other'] as const;
const FREQ_KEYS = ['5nights', 'weekly', 'biweekly', 'monthly', 'onetime', 'unsure'] as const;

export default function QuoteForm() {
  const t = useTranslations('quote_page.form');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
  };

  const fieldClass =
    'w-full min-h-[48px] rounded-xl border border-navy/15 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none transition-all hover:border-navy/25 text-base';
  const labelClass = 'block text-sm font-medium text-navy/80 mb-2';

  if (status === 'success') {
    return (
      <div className="card text-center py-16">
        <div className="w-14 h-14 rounded-full bg-forest text-white flex items-center justify-center text-2xl mx-auto mb-5">✓</div>
        <div className="font-display text-2xl text-navy font-semibold mb-2">{t('success')}</div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t('name')} *</label>
          <input required name="name" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>{t('email')} *</label>
          <input required type="email" name="email" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>{t('phone')}</label>
          <input type="tel" name="phone" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>{t('company')}</label>
          <input name="company" className={fieldClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t('service')} *</label>
          <select required name="service" className={fieldClass} defaultValue="">
            <option value="" disabled>{t('servicePlaceholder')}</option>
            {SERVICE_KEYS.map((k) => (
              <option key={k} value={k}>{t(`serviceOptions.${k}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('propertyType')}</label>
          <select name="propertyType" className={fieldClass} defaultValue="">
            <option value="" disabled>{t('servicePlaceholder')}</option>
            {PROPERTY_KEYS.map((k) => (
              <option key={k} value={k}>{t(`propertyOptions.${k}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('size')}</label>
          <input name="size" inputMode="numeric" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>{t('frequency')}</label>
          <select name="frequency" className={fieldClass} defaultValue="">
            <option value="" disabled>{t('servicePlaceholder')}</option>
            {FREQ_KEYS.map((k) => (
              <option key={k} value={k}>{t(`frequencyOptions.${k}`)}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>{t('message')}</label>
        <textarea name="message" rows={5} placeholder={t('messagePlaceholder')} className={fieldClass} />
      </div>

      {status === 'error' && (
        <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm">{t('error')}</div>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn btn-accent w-full sm:w-auto disabled:opacity-60">
        {status === 'submitting' ? t('submitting') : `${t('submit')} →`}
      </button>
    </form>
  );
}
