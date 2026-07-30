'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Areas() {
  const t = useTranslations('areas');
  const list = t.raw('list') as string[];

  return (
    <section className="section bg-navy text-white overflow-hidden relative" aria-labelledby="areas-title">
      <div
        className="absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #3A7A3E 0, transparent 40%), radial-gradient(circle at 80% 60%, #3A7A3E 0, transparent 40%)'
        }}
      />
      <div className="blob bg-forest absolute" style={{ width: 500, height: 500, top: '-100px', right: '-150px', opacity: 0.15 }} />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow !text-forest-100 mb-3"
          >
            {t('eyebrow')}
          </motion.div>
          <motion.h2
            id="areas-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl xs:text-4xl lg:text-5xl font-semibold tracking-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-white/70 text-base sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {list.map((city, i) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-5 sm:px-4 sm:py-6 text-center text-white/90 hover:bg-white/[0.1] hover:border-forest/50 transition-colors cursor-default"
            >
              <div className="font-display text-base sm:text-lg">{city}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
