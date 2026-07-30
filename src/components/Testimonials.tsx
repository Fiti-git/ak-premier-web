'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

type Item = { quote: string; author: string; role: string };

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Item[];

  return (
    <section className="section bg-cream" aria-labelledby="testimonials-title">
      <div className="container-x">
        <div className="max-w-2xl mb-10 sm:mb-14">
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
            id="testimonials-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl xs:text-4xl lg:text-5xl text-navy font-semibold tracking-tight"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {items.map((it, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ y: -8 }}
              className="card flex flex-col relative"
            >
              <div
                aria-hidden
                className="absolute -top-4 -left-2 font-display text-8xl text-forest/10 leading-none select-none"
              >
                &ldquo;
              </div>
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-forest mb-4 relative" fill="currentColor" aria-hidden>
                <path d="M7 7h4v4H8c0 3 1 4 3 4v3c-4 0-6-2-6-6V7zm10 0h4v4h-3c0 3 1 4 3 4v3c-4 0-6-2-6-6V7z" />
              </svg>
              <blockquote className="text-navy/85 leading-relaxed flex-1 relative">
                {it.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-black/5 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${i % 2 === 0 ? '#3A7A3E' : '#1B2C5C'}, ${i % 2 === 0 ? '#1B2C5C' : '#3A7A3E'})`
                  }}
                  aria-hidden
                />
                <div>
                  <div className="font-semibold text-navy text-sm">{it.author}</div>
                  <div className="text-xs text-navy/60">{it.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
