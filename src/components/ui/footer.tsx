import Link from "next/link";
import Image from "next/image"; // アイコンを使用するためにインポート
import SocialIcons from "./SocialIcons"; // SocialIconsコンポーネントをインポート

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      {/* グリッドレイアウトを使用してセクションを配置 */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center max-w-5xl px-4">
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

          {/* ナビゲーションリンク（左詰めで縦並び） */}
          <div className="flex flex-col text-xs">
            <Link href="/about" className="hover:underline mb-2">
              山ゼミとは
            </Link>
            <Link href="/activities" className="hover:underline mb-2">
              活動紹介
            </Link>
            <Link href="/application" className="hover:underline mb-2">
              入ゼミ
            </Link>
            <Link href="/contact" className="hover:underline mb-2">
              お問い合わせ
            </Link>
            <div className="mt-4"> {/* 少し行間を空けてからプライバシーポリシーを表示 */}
              <Link href="/privacy" className="hover:underline">
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </div>

        {/* 中央セクション（空白） */}
        <div></div>

        {/* 右セクション */}
        <div className="flex justify-center">
          {/* SNSアイコン（SocialIconsコンポーネントを使用） */}
          <SocialIcons /> {/* ここでSNSアイコンを表示 */}
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