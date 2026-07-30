'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      className="hero-gradient relative overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Floating blobs */}
      <div className="blob bg-forest" style={{ width: 400, height: 400, top: '-80px', right: '10%' }} />
      <div className="blob bg-navy" style={{ width: 320, height: 320, bottom: '-100px', left: '-40px', animationDelay: '-6s' }} />

      <motion.div
        style={{ y, opacity }}
        className="container-x pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative"
      >
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-4"
          >
            {t('eyebrow')}
          </motion.div>
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-navy text-[2rem] leading-[1.08] xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight max-w-3xl"
          >
            {t('title').split(' ').map((word, i, arr) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="inline-block mr-[0.25em]"
              >
                {i === arr.length - 2 || i === arr.length - 1 ? (
                  <span className="shimmer">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-base sm:text-lg text-navy/70 max-w-xl leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 sm:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3"
          >
            <Link href="/quote" className="btn btn-accent group">
              <span>{t('ctaPrimary')}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/services" className="btn btn-ghost">
              {t('ctaSecondary')}
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-navy/60"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
              Licensed & Insured
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" style={{ animationDelay: '0.5s' }} />
              24hr Response
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" style={{ animationDelay: '1s' }} />
              Free Estimates
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5 relative"
        >
          <motion.div
            style={{ y: imgY }}
            className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(27,44,92,0.4)]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs uppercase tracking-[0.16em] opacity-80">Est. 2024</div>
              <div className="font-display text-2xl mt-1">Care that shows.</div>
            </div>
          </motion.div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="hidden sm:block absolute -bottom-6 -left-6 lg:-left-10 bg-white rounded-2xl shadow-2xl p-4 pr-6 border border-navy/5"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{
                      background: `linear-gradient(135deg, ${i === 0 ? '#3A7A3E' : i === 1 ? '#1B2C5C' : '#243A78'}, ${i === 0 ? '#2E6231' : i === 1 ? '#243A78' : '#3A7A3E'})`
                    }}
                  />
                ))}
              </div>
              <div>
                <div className="text-navy font-semibold text-sm">100+ properties</div>
                <div className="text-navy/50 text-xs">trust A&amp;K</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-navy/40"
        aria-hidden
      >
        <div className="text-[10px] uppercase tracking-[0.2em]">Scroll</div>
        <div className="w-px h-8 bg-navy/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-3 bg-forest"
            animate={{ y: [-12, 32] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
