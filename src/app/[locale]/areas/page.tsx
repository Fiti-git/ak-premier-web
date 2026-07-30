import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import PageHero from '@/components/PageHero';

export default function AreasPage() {
  const t = useTranslations('areas_page');
  const tAreas = useTranslations('areas');
  const tNav = useTranslations('nav');
  const cities = tAreas.raw('list') as string[];

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="section">
        <div className="container-x">
          <div className="eyebrow mb-3">{t('primary')}</div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cities.map((city) => (
              <div
                key={city}
                className="rounded-2xl border border-navy/10 bg-white px-4 py-6 text-center hover:border-forest/40 hover:shadow-sm transition-all"
              >
                <div className="font-display text-lg text-navy">{city}</div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl bg-cream border border-navy/5 p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-lg">
              <div className="font-display text-2xl text-navy font-semibold mb-2">
                {t('ctaTitle')}
              </div>
              <p className="text-navy/65">{t('ctaBody')}</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              {tNav('contact')} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
