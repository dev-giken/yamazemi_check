import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { SeoHead } from "@/components/seoHead";  // Import SeoHead component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Use SeoHead component instead of Metadata */}
        <SeoHead
          title="慶應義塾大学商学部 山本勲研究会"
          titleTemplate="慶應義塾大学商学部 山本勲研究会"
          description="山ゼミ | 計量経済学をツールに総合力を身につける"
          ogType="website"
          imgUrl="/images/seminar_square_logo.png"
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