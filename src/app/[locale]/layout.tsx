import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import ButtonRipple from '@/components/ButtonRipple';
import StickyMobileBar from '@/components/StickyMobileBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} className={`${inter.variable} ${display.variable}`}>
      <body>
        <NextIntlClientProvider>
          <a href="#main" className="skip-link">Skip to content</a>
          <ScrollProgress />
          <ButtonRipple />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StickyMobileBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
