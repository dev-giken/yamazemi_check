import Link from "next/link";
import Image from "next/image"; // アイコンを使用するためにインポート
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react"; // ソーシャルメディアアイコン

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      {/* グリッドレイアウトを使用してセクションを配置 */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center max-w-5xl">
        {/* 左セクション */}
        <div className="flex flex-col items-start">
          {/* アイコンと会社名 */}
          <div className="flex items-center mb-4">
            <Image
              src="/images/header/yamazemi_logo_celeste.png" // 画像のパス
              alt="アイコン"
              width={45} // 必要に応じてサイズを調整
              height={45}
              className="mr-2"
            />
            <span className="text-lg sm:text-2xl font-bold">山本勲研究会</span>
          </div>

          {/* ナビゲーションリンク（左詰め） */}
          <div className="flex flex-col text-xs">
            <Link href="/about" className="hover:underline mb-2">
              山ゼミとは
            </Link>
            <Link href="/contact" className="hover:underline mb-2">
              お問い合わせ
            </Link>
            <Link href="/privacy" className="hover:underline">
              プライバシーポリシー
            </Link>
          </div>
        </div>

        {/* 中央セクション（空白） */}
        <div></div>

        {/* 右セクション */}
        <div className="flex justify-center">
          {/* SNSアイコン（中央揃え） */}
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6 hover:text-gray-400" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <TwitterIcon className="w-5 h-5 sm:w-6 sm:h-6 hover:text-gray-400" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 hover:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* フッターのボトムセクション */}
      <div className="mt-4 text-center text-xs sm:text-sm">
        © 山本勲研究会. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;