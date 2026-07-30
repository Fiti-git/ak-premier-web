'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/i18n/routing';
import Logo from './Logo';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/about', label: t('about') },
    { href: '/areas', label: t('areas') },
    { href: '/contact', label: t('contact') }
  ];

  const mobileMenu = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden fixed inset-0 overflow-y-auto"
          style={{ backgroundColor: '#FAFAF7', zIndex: 999 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Top bar with logo + close button */}
          <div className="sticky top-0 bg-cream border-b border-navy/10 z-10">
            <div className="container-x flex items-center justify-between h-20">
              <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
                <Logo size="sm" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center shadow-md hover:bg-navy-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="container-x pt-6 pb-16 flex flex-col gap-1" aria-label="Mobile primary">
            {links.map((l, i) => {
              const active = pathname === l.href;
              return (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className={`flex items-center justify-between py-5 text-2xl font-display font-semibold border-b border-navy/10 transition-colors ${
                      active ? 'text-forest' : 'text-navy hover:text-forest active:text-forest'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{l.label}</span>
                    <span className="text-navy/30 text-lg">→</span>
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-4 pt-10"
            >
              <Link
                href="/quote"
                className="btn btn-accent w-full justify-center text-base"
                onClick={() => setOpen(false)}
              >
                {t('quote')} →
              </Link>
              <div className="flex justify-center">
                <LocaleSwitcher />
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-lg border-b border-black/5 shadow-[0_1px_20px_-8px_rgba(27,44,92,0.15)]'
            : 'bg-cream/60 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-20' : 'h-24'}`}>
          <Link href="/" className="shrink-0 rounded-lg" aria-label="A&K Premier Property Solutions — Home">
            <Logo size={scrolled ? 'sm' : 'md'} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-4 py-2 text-sm rounded-full transition-colors ${
                    active ? 'text-forest' : 'text-navy/75 hover:text-forest'
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-forest rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LocaleSwitcher />
            <Link href="/quote" className="btn btn-accent text-sm py-2.5">
              {t('quote')}
            </Link>
          </div>

          <button
            className={`lg:hidden relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full border transition-colors ${
              open
                ? 'bg-navy border-navy'
                : 'bg-white border-navy/15 shadow-sm hover:border-navy/40'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <motion.span
              className={`block w-6 h-[3px] rounded-full ${open ? 'bg-white' : 'bg-navy'}`}
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`block w-6 h-[3px] rounded-full ${open ? 'bg-white' : 'bg-navy'}`}
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`block w-6 h-[3px] rounded-full ${open ? 'bg-white' : 'bg-navy'}`}
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
