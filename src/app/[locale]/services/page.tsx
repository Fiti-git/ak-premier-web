import Services from '@/components/Services';
import CTA from '@/components/CTA';
import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('services_page.hero');
  return (
    <>
      <section className="hero-gradient">
        <div className="container-x pt-24 pb-16 lg:pt-32 lg:pb-20 max-w-4xl">
          <div className="eyebrow mb-3">{t('eyebrow')}</div>
          <h1 className="font-display text-navy text-5xl lg:text-6xl font-semibold tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-5 text-lg text-navy/70 max-w-2xl">{t('subtitle')}</p>
        </div>
      </section>
      <Services />
      <CTA />
    </>
  );
}
