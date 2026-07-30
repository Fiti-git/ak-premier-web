'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const KEYS = ['communities', 'doors', 'nights', 'insured'] as const;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setVal(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      <span className="text-forest">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="section relative overflow-hidden" aria-labelledby="stats-title">
      <div className="container-x">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="eyebrow mb-3">
            {t('eyebrow')}
          </motion.div>
          <motion.h2 id="stats-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-3xl xs:text-4xl lg:text-5xl text-navy font-semibold tracking-tight">
            {t('title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-navy/10 rounded-2xl overflow-hidden border border-navy/10">
          {KEYS.map((k, i) => {
            const value = t.raw(`items.${k}.value`) as number;
            const suffix = t.raw(`items.${k}.suffix`) as string;
            const label = t.raw(`items.${k}.label`) as string;
            return (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-cream p-6 sm:p-8 lg:p-10 group hover:bg-white transition-colors"
              >
                <div className="font-display text-4xl xs:text-5xl lg:text-6xl text-navy font-semibold tracking-tight leading-none">
                  <Counter to={value} suffix={suffix} />
                </div>
                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-navy/60 leading-snug">
                  {label}
                </div>
                <div className="mt-4 h-0.5 w-8 bg-forest scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
