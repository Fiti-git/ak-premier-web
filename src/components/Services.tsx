'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useRef } from 'react';

const KEYS = ['janitorial', 'grounds', 'maintenance', 'specialty'] as const;

const ICONS: Record<(typeof KEYS)[number], React.ReactNode> = {
  janitorial: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20l4-10h8l4 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 10V4h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  grounds: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3c3 4 3 8 0 12-3-4-3-8 0-12z" strokeLinejoin="round" />
      <path d="M4 21c4-3 12-3 16 0" strokeLinecap="round" />
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14 3l7 7-4 4-7-7 4-4z" strokeLinejoin="round" />
      <path d="M10 10L3 17v4h4l7-7" strokeLinejoin="round" />
    </svg>
  ),
  specialty: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" strokeLinejoin="round" />
    </svg>
  )
};

function TiltCard({ children, i }: { children: React.ReactNode; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="transition-transform duration-300 ease-out will-change-transform h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const t = useTranslations('services');

  return (
    <section className="section bg-cream relative" id="services" aria-labelledby="services-title">
      <div className="container-x">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-3"
          >
            {t('eyebrow')}
          </motion.div>
          <motion.h2
            id="services-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl xs:text-4xl lg:text-5xl text-navy font-semibold tracking-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-navy/65 text-base sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KEYS.map((key, i) => (
            <TiltCard key={key} i={i}>
              <Link href="/services" className="card block h-full group">
                <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-5 group-hover:bg-forest group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {ICONS[key]}
                </div>
                <div className="font-display text-xl sm:text-2xl text-navy font-semibold mb-2">
                  {t(`items.${key}.title`)}
                </div>
                <p className="text-navy/65 text-sm leading-relaxed">
                  {t(`items.${key}.desc`)}
                </p>
                <div className="mt-6 text-sm font-medium text-forest inline-flex items-center gap-1 group-hover:gap-3 transition-all">
                  <span>{t('learnMore')}</span>
                  <span>→</span>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
