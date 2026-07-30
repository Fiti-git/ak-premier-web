import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import CTA from '@/components/CTA';

const VALUES = ['professional', 'reliable', 'trusted'] as const;

export default function AboutPage() {
  const t = useTranslations('about_page');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">{t('story.eyebrow')}</div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy font-semibold tracking-tight">
              {t('story.title')}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-navy/70 text-lg leading-relaxed whitespace-pre-line">
              {t('story.body')}
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-3">{t('values.eyebrow')}</div>
            <h2 className="font-display text-4xl lg:text-5xl text-navy font-semibold tracking-tight">
              {t('values.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((k, i) => (
              <div key={k} className="card">
                <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center text-sm font-semibold mb-4">
                  {i + 1}
                </div>
                <div className="font-display text-2xl text-navy font-semibold mb-2">
                  {t(`values.items.${k}.title`)}
                </div>
                <p className="text-navy/65 leading-relaxed">
                  {t(`values.items.${k}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
