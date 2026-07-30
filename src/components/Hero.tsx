'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('hero');
  const brand = useTranslations('brand');
  const dots = t.raw('trustDots') as string[];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="hero-gradient relative overflow-hidden" aria-labelledby="hero-title">
      <div className="blob bg-forest" style={{ width: 400, height: 400, top: '-80px', right: '10%' }} />
      <div className="blob bg-navy" style={{ width: 320, height: 320, bottom: '-100px', left: '-40px', animationDelay: '-6s' }} />

      <motion.div
        style={{ y, opacity }}
        className="container-x pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative"
      >
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow mb-4">
            {t('eyebrow')}
          </motion.div>
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-navy text-[2rem] leading-[1.08] xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight max-w-3xl"
          >
            {t('title').split('. ').map((phrase, i, arr) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                className="block"
              >
                {i === 1 ? <span className="shimmer">{phrase}{i < arr.length - 1 ? '.' : ''}</span> : `${phrase}${i < arr.length - 1 ? '.' : ''}`}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-6 text-base sm:text-lg text-navy/70 max-w-xl leading-relaxed">
            {t('subtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} className="mt-8 sm:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
            <Link href="/quote" className="btn btn-accent group">
              <span>{t('ctaPrimary')}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a href={`tel:${brand('phoneRaw')}`} className="btn btn-ghost group">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{t('ctaSecondary')}</span>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-navy/60">
            {dots.map((d, i) => (
              <div key={d} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                {d}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }} className="lg:col-span-5 relative">
          <motion.div style={{ y: imgY }} className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(27,44,92,0.4)]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs uppercase tracking-[0.16em] opacity-80">DFW, Texas</div>
              <div className="font-display text-2xl mt-1">A cleaner community.</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="hidden sm:block absolute -bottom-6 -left-6 lg:-left-10 bg-white rounded-2xl shadow-2xl p-4 pr-6 border border-navy/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-navy/50 text-[10px] uppercase tracking-widest">Call today</div>
                <a href={`tel:${brand('phoneRaw')}`} className="text-navy font-semibold text-sm hover:text-forest transition-colors">{brand('phone')}</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
