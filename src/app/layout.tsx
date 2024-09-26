import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "慶應義塾大学商学部 山本勲研究会",
  description: "山ゼミ | 計量経済学をツールに総合力を身につける",
  metadataBase: new URL("https://www.yamazemi.info"),
  openGraph: {
    title: "慶應義塾大学商学部 山本勲研究会",
    description: "計量経済学をツールに総合力を身につける",
    url: "/",
    images: [
      {
        url: "/images/seminar_square_logo.png",
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
    title: "慶應義塾大学商学部 山本勲研究会",
    description: "計量経済学をツールに総合力を身につける",
    images: [
      {
        url: "/images/seminar_square_logo.png",
        alt: "山本勲研究会",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}