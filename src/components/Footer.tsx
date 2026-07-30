import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Logo from './Logo';
import Newsletter from './Newsletter';

export default function Footer() {
  const t = useTranslations();
  const brand = useTranslations('brand');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-navy text-white/85 pb-20 lg:pb-0">
      <div className="container-x py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="mb-6">
            <Logo variant="light" size="lg" />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/70 mb-6">
            {t('footer.about')}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href={`tel:${brand('phoneRaw')}`} className="inline-flex items-center gap-2 text-white hover:text-forest-100 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {brand('phone')}
            </a>
            <a href={`mailto:${brand('email')}`} className="inline-flex items-center gap-2 text-white hover:text-forest-100 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinejoin="round"/>
                <path d="M22 6l-10 7L2 6" strokeLinejoin="round"/>
              </svg>
              {brand('email')}
            </a>
          </div>
          <div className="mt-3 text-xs text-white/50 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinejoin="round"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {brand('location')}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.16em] text-forest-100 mb-4 font-semibold">
            {t('footer.quickLinks')}
          </div>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white text-white/70 transition-colors">{t('nav.home')}</Link></li>
            <li><Link href="/services" className="hover:text-white text-white/70 transition-colors">{t('nav.services')}</Link></li>
            <li><Link href="/about" className="hover:text-white text-white/70 transition-colors">{t('nav.about')}</Link></li>
            <li><Link href="/areas" className="hover:text-white text-white/70 transition-colors">{t('nav.areas')}</Link></li>
            <li><Link href="/contact" className="hover:text-white text-white/70 transition-colors">{t('nav.contact')}</Link></li>
            <li><Link href="/quote" className="hover:text-white text-white/70 transition-colors">{t('nav.quote')}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-white/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {year} A&amp;K Premier Property Solutions LLC. {t('footer.rights')}</div>
          <div className="flex items-center gap-4">
            <span>{t('footer.bilingual')}</span>
            <span className="text-forest-100">{brand('tagline')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
