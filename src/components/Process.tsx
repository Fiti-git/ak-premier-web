'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Step = { title: string; desc: string };

export default function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Step[];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 30%']
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="section" aria-labelledby="process-title">
      <div className="container-x">
        <div className="max-w-2xl mb-12 sm:mb-16">
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
            id="process-title"
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

        <div ref={ref} className="relative pl-10 sm:pl-14">
          {/* Track */}
          <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-0.5 bg-navy/10 rounded-full" aria-hidden />
          <motion.div
            className="absolute left-4 sm:left-5 top-2 w-0.5 bg-gradient-to-b from-forest to-navy rounded-full"
            style={{ height: lineHeight }}
            aria-hidden
          />

          <div className="space-y-10 sm:space-y-14">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-10 sm:-left-14 top-1 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-forest text-forest flex items-center justify-center font-display text-sm sm:text-base font-semibold shadow-md">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-display text-xl sm:text-2xl text-navy font-semibold mb-1.5">
                  {step.title}
                </div>
                <p className="text-navy/65 leading-relaxed max-w-xl">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
