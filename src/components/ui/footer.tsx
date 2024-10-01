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
              src="/images/header/yamazemi_logo_celeste.webp" // 画像のパス
              alt="アイコン"
              width={35}
              height={35}
              className="mr-2"
            />
            <Link href="/" className="text-[18px] sm:text-2xl font-bold">山本勲研究会</Link>
          </div>

          {/* ナビゲーションリンク（左詰めで縦並び） */}
          <div className="flex flex-col text-[12px] sm:text-xs space-y-4">
            <div>
              <Link href="/about" className="hover:underline font-bold">
                ゼミ員
              </Link>
              {/* ゼミ員に従属するリンク */}
              <div className="ml-4 mt-1 space-y-2">
                <Link href="/about/students" className="hover:underline block">
                  学生紹介
                </Link>
                <Link href="/about/professor" className="hover:underline block">
                  教授紹介
                </Link>
              </div>
            </div>

            <div>
              <Link href="/activities" className="hover:underline font-bold">
                活動
              </Link>
              {/* 活動に従属するリンク */}
              <div className="ml-4 mt-1 space-y-2">
                <Link href="/activities/year" className="hover:underline block">
                  年間の活動
                </Link>
                <Link href="/activities/mitaron" className="hover:underline block">
                  三田論
                </Link>
                <Link href="/activities/ws" className="hover:underline block">
                  WS
                </Link>
                <Link href="/activities/obog" className="hover:underline block">
                  OB/OGとの関わり
                </Link>
              </div>
            </div>

            <div>
              <Link href="/application" className="hover:underline font-bold">
                入ゼミ
              </Link>
              {/* 入ゼミに従属するリンク */}
              <div className="ml-4 mt-1 space-y-2">
                <Link href="/application/entry" className="hover:underline block">
                  エントリー
                </Link>
                <Link href="/application/exam" className="hover:underline block">
                  試験概要
                </Link>
                <Link href="/application/docs" className="hover:underline block">
                  説明会資料・先生インタビュー
                </Link>
              </div>
            </div>

            <Link href="/contact" className="hover:underline font-bold">
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
      <div className="mt-4 text-center text-[8px] sm:text-xs">
        © 山本勲研究会. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;