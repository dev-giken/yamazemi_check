import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const defaultUrl = "https://www.yamazemi.info";
  const defaultImage = "/images/seminar_square_logo.webp";
  const title = "山本勲研究会 | 公式ホームページ";
  const description = "慶應義塾大学商学部設置 | 『計量経済学をツールに総合力を身につける』\n-山ゼミに関する全ての情報がここに！ゼミ員ブログも！";

  return {
    title,
    description,
    metadataBase: new URL(defaultUrl),
    openGraph: {
      title,
      description,
      url: defaultUrl,
      images: [
        {
          url: defaultImage,
          width: 500,
          height: 500,
          alt: "山本勲研究会",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yamazemi2024",
      title,
      description,
      images: [
        {
          url: defaultImage,
          alt: "山本勲研究会",
        },
      ],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="images/apple-icon.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="images/favicon-32x32.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="images/favicon-16x16.webp" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}