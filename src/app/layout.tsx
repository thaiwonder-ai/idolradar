import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IdolRadar.club - Global Idol Fan Platform',
  description: 'Connect with idol fans worldwide, track latest updates, and discover new favorites. Multi-language support: English, 中文, 日本語, 한국어, ไทย, Tiếng Việt, Bahasa Indonesia, Bahasa Melayu, Español',
  keywords: 'idol, kpop, jpop, cpop, fan, community, news, forum',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'IdolRadar.club - Global Idol Fan Platform',
    description: 'Your hub for idol news, community, and updates',
    url: 'https://idolradar.club',
    siteName: 'IdolRadar',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}