import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const defaultUrl = "https://www.yamazemi.info";
  const defaultImage = "/images/seminar_square_logo.png";
  const title = "慶應義塾大学商学部 山本勲研究会";
  const description = "山ゼミ | 計量経済学をツールに総合力を身につける";

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