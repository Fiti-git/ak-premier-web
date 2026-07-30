import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A&K Premier Property Solutions',
  description:
    'Professional, reliable, and trusted property services — cleaning, landscaping, and maintenance for commercial and residential properties.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
