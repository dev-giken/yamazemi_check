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
            {/* 「お知らせ」リンク */}
            <Link href="/news" className="hover:underline font-bold">
              お知らせ
            </Link>

            {/* 「ブログ」リンク */}
            <Link href="/blog" className="hover:underline font-bold">
              ブログ
            </Link>

            {/* 「ゼミ情報」セクション */}
            <div>
              <span className="font-bold">
                ゼミ情報
              </span>
              {/* ゼミ情報に従属するリンク */}
              <div className="ml-4 mt-1 space-y-2">
                <span className="font-semibold">ゼミ員</span>
                <ul className="ml-4">
                  <li>
                    <Link href="/about/students" className="hover:underline block">
                      学生紹介
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/professor" className="hover:underline block">
                      教授紹介
                    </Link>
                  </li>
                </ul>
                <span className="font-semibold">活動</span>
                <ul className="ml-4">
                  <li>
                    <Link href="/activities/year" className="hover:underline block">
                      年間の活動
                    </Link>
                  </li>
                  <li>
                    <Link href="/activities/mitaron" className="hover:underline block">
                      三田論
                    </Link>
                  </li>
                  <li>
                    <Link href="/activities/ws" className="hover:underline block">
                      WS
                    </Link>
                  </li>
                  <li>
                    <Link href="/activities/obog" className="hover:underline block">
                      OB/OGとの関わり
                    </Link>
                  </li>
                </ul>
                <span className="font-semibold">入ゼミ</span>
                <ul className="ml-4">
                  <li>
                    <Link href="/application/entry" className="hover:underline block">
                      エントリー・試験概要
                    </Link>
                  </li>
                  <li>
                    <Link href="/application/events" className="hover:underline block">
                      各種イベント
                    </Link>
                  </li>
                  <li>
                    <Link href="/application/docs" className="hover:underline block">
                      説明会資料・先生インタビュー
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* 「お問い合わせ」リンク */}
            <Link href="/contact" className="hover:underline font-bold">
              お問い合わせ
            </Link>

            {/* プライバシーポリシー */}
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