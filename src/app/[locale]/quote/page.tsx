import { useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import QuoteForm from '@/components/QuoteForm';

export default function QuotePage() {
  const t = useTranslations('quote_page');
  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className="pb-24">
        <div className="container-x max-w-3xl">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
