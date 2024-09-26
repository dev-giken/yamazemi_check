import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { SeoHead } from "@/components/seoHead";  // SeoHeadのインポート
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 環境変数からpageOgImgを設定
  const pageOgImg: string = `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}`;

  return (
    <html lang="ja">
      <head>
        {/* SeoHeadコンポーネントを使用 */}
        <SeoHead
          title="慶應義塾大学商学部"
          titleTemplate="山本勲研究会"
          description="山ゼミ | 計量経済学をツールに総合力を身につける"
          ogType="website"
          // pageOgImg変数を使用して画像URLを設定
          imgUrl={`${pageOgImg}/images/seminar_square_logo.png`}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}