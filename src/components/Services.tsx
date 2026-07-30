'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useRef } from 'react';

const KEYS = ['valetTrash', 'valetRecycling', 'bulkItems', 'powerWash'] as const;

const ICONS: Record<(typeof KEYS)[number], React.ReactNode> = {
  valetTrash: (
    // Trash can
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
    </svg>
  ),
  valetRecycling: (
    // Recycling symbol
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 19h4l-2-3M17 19h-2l-3-5M12 5l2 3-4 0M7 19a2 2 0 01-1.7-3l2.5-4M17 19a2 2 0 001.7-3l-2.5-4M12 5a2 2 0 013.5 0l2 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  bulkItems: (
    // Sofa/couch
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12v6M20 12v6M4 12a2 2 0 012-2h12a2 2 0 012 2M4 14h16M6 18v2M18 18v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  powerWash: (
    // Spray/pressure washer
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 20h6l4-14h2M9 20l-1-3M12 20l-1-3M6 20l-1-3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="4" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="8" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="15" cy="6" r="1" fill="currentColor" opacity="0.4" />
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
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="eyebrow mb-3">
            {t('eyebrow')}
          </motion.div>
          <motion.h2 id="services-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display text-3xl xs:text-4xl lg:text-5xl text-navy font-semibold tracking-tight">
            {t('title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-navy/65 text-base sm:text-lg">
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KEYS.map((key, i) => (
            <TiltCard key={key} i={i}>
              <Link href="/services" className="card block h-full group">
                <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center mb-5 group-hover:bg-forest transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                  {ICONS[key]}
                </div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-forest font-semibold mb-1">
                  {t(`items.${key}.short`)}
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
