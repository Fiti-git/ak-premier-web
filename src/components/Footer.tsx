import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-navy text-white/85">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-6">
            <Logo variant="light" size="lg" />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/70">
            {t('footer.about')}
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-forest-100 mb-4 font-semibold">
            {t('footer.quickLinks')}
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white text-white/70">{t('nav.home')}</Link></li>
            <li><Link href="/services" className="hover:text-white text-white/70">{t('nav.services')}</Link></li>
            <li><Link href="/about" className="hover:text-white text-white/70">{t('nav.about')}</Link></li>
            <li><Link href="/areas" className="hover:text-white text-white/70">{t('nav.areas')}</Link></li>
            <li><Link href="/quote" className="hover:text-white text-white/70">{t('nav.quote')}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-forest-100 mb-4 font-semibold">
            {t('footer.contact')}
          </div>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <div className="text-white/50 text-xs mb-0.5">{t('footer.phone')}</div>
              {t('footer.phoneValue')}
            </li>
            <li>
              <div className="text-white/50 text-xs mb-0.5">{t('footer.email')}</div>
              {t('footer.emailValue')}
            </li>
            <li>
              <div className="text-white/50 text-xs mb-0.5">{t('footer.address')}</div>
              {t('footer.addressValue')}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-white/50 flex flex-col md:flex-row items-center justify-between gap-2">
          <div>© {year} A&amp;K Premier Property Solutions LLC. {t('footer.rights')}</div>
          <div>{t('brand.tagline')}</div>
        </div>
      </div>
    </footer>
  );
}
