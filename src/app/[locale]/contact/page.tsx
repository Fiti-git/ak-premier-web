import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/PageHero';

export default function ContactPage() {
  const t = useTranslations('contact_page');
  const tFooter = useTranslations('footer');
  const tNav = useTranslations('nav');

  const items = [
    { label: tFooter('phone'), value: tFooter('phoneValue'), icon: '☎' },
    { label: tFooter('email'), value: tFooter('emailValue'), icon: '✉' },
    { label: tFooter('address'), value: tFooter('addressValue'), icon: '⌂' },
    { label: t('hoursTitle'), value: t('hoursValue'), icon: '◷' },
    { label: t('emergencyTitle'), value: t('emergencyValue'), icon: '⚑' }
  ];

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
            {items.map((it) => (
              <div key={it.label} className="card">
                <div className="w-10 h-10 rounded-full bg-navy/5 text-navy flex items-center justify-center text-lg mb-4">
                  {it.icon}
                </div>
                <div className="text-xs uppercase tracking-[0.14em] text-navy/50 font-semibold mb-1">
                  {it.label}
                </div>
                <div className="text-navy font-medium">{it.value}</div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-navy text-white p-8 lg:p-10">
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
