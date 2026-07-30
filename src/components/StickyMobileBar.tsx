'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function StickyMobileBar() {
  const t = useTranslations('sticky');
  const brand = useTranslations('brand');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-navy/10 flex gap-2 p-2">
            <a
              href={`tel:${brand('phoneRaw')}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-navy text-white font-semibold text-sm active:scale-95 transition-transform"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('call')}
            </a>
            <Link
              href="/quote"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-forest text-white font-semibold text-sm active:scale-95 transition-transform"
            >
              {t('quote')} →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
