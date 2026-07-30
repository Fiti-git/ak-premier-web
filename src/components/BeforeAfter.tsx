'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

const BEFORE_IMG = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=80';
const AFTER_IMG = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80';

export default function BeforeAfter() {
  const t = useTranslations('beforeAfter');
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <section className="section bg-cream" aria-labelledby="ba-title">
      <div className="container-x">
        <div className="max-w-2xl mb-10 sm:mb-12">
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
            id="ba-title"
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          ref={containerRef}
          className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize touch-none"
          onMouseMove={(e) => dragging.current && updatePos(e.clientX)}
          onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => updatePos(e.touches[0].clientX)}
          onTouchStart={(e) => updatePos(e.touches[0].clientX)}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
          }}
        >
          {/* After image (full) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${AFTER_IMG}')` }}
          />
          <div className="absolute top-4 right-4 bg-forest text-white text-xs font-semibold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full">
            {t('after')}
          </div>

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${BEFORE_IMG}')`,
              clipPath: `inset(0 ${100 - pos}% 0 0)`
            }}
          />
          <div
            className="absolute top-4 left-4 bg-navy text-white text-xs font-semibold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full transition-opacity"
            style={{ opacity: pos > 15 ? 1 : 0 }}
          >
            {t('before')}
          </div>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-navy" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 12h8M8 12l3-3M8 12l3 3M16 12l-3-3M16 12l-3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
