import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react"; // アイコンとして使用する場合

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* 会社名やロゴ */}
        <div className="mb-4 md:mb-0">
          <Link href="/" className="text-lg font-bold">
            Yamazemi
          </Link>
        </div>

        {/* ナビゲーションリンク */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

        {/* ソーシャルメディアアイコン */}
        <div className="flex space-x-4">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="w-6 h-6 hover:text-gray-400" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="w-6 h-6 hover:text-gray-400" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="w-6 h-6 hover:text-gray-400" />
          </Link>
        </div>
      </div>

      {/* 著作権情報 */}
      <div className="mt-4 text-center text-sm">
        © 2024 Yamazemi Official. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;