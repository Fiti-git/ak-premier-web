'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '',
  suffix = ''
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-navy/80">{label}</label>
        <div className="font-display text-2xl text-navy font-semibold tabular-nums">
          {prefix}{value.toLocaleString()}{suffix}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-navy/10"
        style={{
          background: `linear-gradient(to right, #3A7A3E 0%, #3A7A3E ${pct}%, rgba(27,44,92,0.1) ${pct}%, rgba(27,44,92,0.1) 100%)`
        }}
      />
      <div className="flex justify-between text-[10px] text-navy/40 mt-1">
        <span>{prefix}{min}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}

export default function Calculator() {
  const t = useTranslations('calculator');
  const tNav = useTranslations('nav');
  const [doors, setDoors] = useState(200);
  const [fee, setFee] = useState(25);
  const [cost, setCost] = useState(9);

  const results = useMemo(() => {
    const revenue = doors * fee;
    const expense = doors * cost;
    const noi = revenue - expense;
    const annual = noi * 12;
    const margin = revenue > 0 ? (noi / revenue) * 100 : 0;
    return { revenue, expense, noi, annual, margin };
  }, [doors, fee, cost]);

  return (
    <section className="section bg-navy text-white relative overflow-hidden" aria-labelledby="calc-title">
      <div className="blob bg-forest absolute" style={{ width: 500, height: 500, top: '-100px', right: '-150px', opacity: 0.15 }} />
      <div className="blob bg-forest absolute" style={{ width: 400, height: 400, bottom: '-100px', left: '-100px', opacity: 0.1, animationDelay: '-8s' }} />

      <div className="container-x relative">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="eyebrow !text-forest-100 mb-3">
            {t('eyebrow')}
          </motion.div>
          <motion.h2 id="calc-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-3xl xs:text-4xl lg:text-5xl font-semibold tracking-tight">
            {t('title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-white/70 text-base sm:text-lg">
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Inputs */}
          <div className="lg:col-span-3 bg-white/[0.04] backdrop-blur rounded-3xl p-6 sm:p-8 border border-white/10 space-y-8">
            <div className="text-white/60 text-xs uppercase tracking-[0.16em] font-semibold">Inputs</div>
            <Slider label={t('labels.doors')} value={doors} onChange={setDoors} min={20} max={2000} step={10} />
            <Slider label={t('labels.fee')} value={fee} onChange={setFee} min={5} max={50} step={1} prefix="$" />
            <Slider label={t('labels.cost')} value={cost} onChange={setCost} min={3} max={20} step={1} prefix="$" />
          </div>

          {/* Results */}
          <div className="lg:col-span-2 bg-gradient-to-br from-forest to-forest-700 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <motion.div
              className="absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #fff 0, transparent 70%)' }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative">
              <div className="text-white/70 text-xs uppercase tracking-[0.16em] font-semibold mb-6">
                {t('labels.results')}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-white/80 text-sm">{t('labels.revenue')}</span>
                  <span className="font-display text-xl text-white font-semibold tabular-nums">
                    ${results.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/80 text-sm">{t('labels.expense')}</span>
                  <span className="font-display text-xl text-white/60 font-semibold tabular-nums">
                    –${results.expense.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6 mb-6">
                <div className="text-white/70 text-xs uppercase tracking-widest mb-1">{t('labels.noi')}</div>
                <div className="font-display text-4xl xs:text-5xl text-white font-bold tabular-nums">
                  ${results.noi.toLocaleString()}
                </div>
                <div className="text-white/60 text-xs mt-1">
                  {t('labels.margin')}: {results.margin.toFixed(1)}%
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 mb-6">
                <div className="text-white/70 text-xs uppercase tracking-widest mb-1">{t('labels.annual')}</div>
                <div className="font-display text-2xl text-white font-semibold tabular-nums">
                  ${results.annual.toLocaleString()}
                </div>
              </div>

              <Link href="/quote" className="btn w-full bg-white text-forest-700 hover:bg-cream justify-center">
                {t('labels.cta')} →
              </Link>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-xs text-white/50 text-center max-w-2xl mx-auto">
          {t('labels.disclaimer')}
        </p>
      </div>
    </section>
  );
}
