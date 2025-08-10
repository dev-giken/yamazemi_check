import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import "./globals.css";
import Script from 'next/script';
import { createMetadata } from '@/lib/metadata';

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = () => createMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/images/favicon-32x32.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/images/favicon-16x16.webp" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://www.yamazemi.info" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KR5F9M9G5E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KR5F9M9G5E');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}