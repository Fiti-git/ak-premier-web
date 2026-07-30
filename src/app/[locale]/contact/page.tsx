import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/PageHero';

const ICONS = {
  phone: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinejoin="round"/>
      <path d="M22 6l-10 7L2 6" strokeLinejoin="round"/>
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  hours: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2" strokeLinecap="round"/>
    </svg>
  ),
  emergency: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2L2 22h20L12 2z" strokeLinejoin="round"/>
      <path d="M12 10v4M12 18h.01" strokeLinecap="round"/>
    </svg>
  )
};

export default function ContactPage() {
  const t = useTranslations('contact_page');
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');
  const brand = useTranslations('brand');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">

            {/* Phone */}
            <a href={`tel:${brand('phoneRaw')}`} className="card group hover:border-forest/40">
              <div className="w-11 h-11 rounded-full bg-navy/5 text-navy group-hover:bg-forest group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                {ICONS.phone}
              </div>
              <div className="text-xs uppercase tracking-[0.14em] text-navy/50 font-semibold mb-1.5">
                {tFooter('phone')}
              </div>
              <div className="text-navy font-semibold text-lg group-hover:text-forest transition-colors">
                {tFooter('phoneValue')}
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${brand('email')}`} className="card group hover:border-forest/40">
              <div className="w-11 h-11 rounded-full bg-navy/5 text-navy group-hover:bg-forest group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                {ICONS.email}
              </div>
              <div className="text-xs uppercase tracking-[0.14em] text-navy/50 font-semibold mb-1.5">
                {tFooter('email')}
              </div>
              <div className="text-navy font-medium text-sm break-all group-hover:text-forest transition-colors leading-snug">
                {tFooter('emailValue')}
              </div>
            </a>

            {/* Location */}
            <div className="card">
              <div className="w-11 h-11 rounded-full bg-navy/5 text-navy flex items-center justify-center mb-4">
                {ICONS.location}
              </div>
              <div className="text-xs uppercase tracking-[0.14em] text-navy/50 font-semibold mb-1.5">
                {tFooter('address')}
              </div>
              <div className="text-navy font-semibold text-lg">
                {tFooter('addressValue')}
              </div>
            </div>

            {/* Business Hours */}
            <div className="card">
              <div className="w-11 h-11 rounded-full bg-navy/5 text-navy flex items-center justify-center mb-4">
                {ICONS.hours}
              </div>
              <div className="text-xs uppercase tracking-[0.14em] text-navy/50 font-semibold mb-1.5">
                {t('hoursTitle')}
              </div>
              <div className="text-navy font-medium">
                {t('hoursValue')}
              </div>
            </div>

            {/* Emergency / Support (spans full width on sm+) */}
            <div className="card sm:col-span-2 bg-gradient-to-br from-forest/5 to-forest/10 border-forest/20">
              <div className="w-11 h-11 rounded-full bg-forest text-white flex items-center justify-center mb-4">
                {ICONS.emergency}
              </div>
              <div className="text-xs uppercase tracking-[0.14em] text-forest font-semibold mb-1.5">
                {t('emergencyTitle')}
              </div>
              <div className="text-navy font-medium">
                {t('emergencyValue')}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-navy text-white p-8 lg:p-10 lg:sticky lg:top-28">
              <div className="font-display text-2xl font-semibold mb-3">
                {tNav('quote')}
              </div>
              <p className="text-white/75 mb-6 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-full bg-forest text-white px-5 py-3 text-sm font-medium hover:bg-forest-700 transition-colors"
              >
                {tNav('quote')} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
