import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-8 md:px-16" >
      <Image
        src="/images/404NotFound.webp" // ロゴのパスを正しいものに修正
        alt="Kawaii Logo"
        width={400}
        height={400}
        className="mb-6"
      />
      <p className="text-[10px] text-gray-700 mt-4 text-center">
        お探しのページが見つかりませんでした。リンクが間違っているか、<br />ページが削除された可能性があります。
      </p>
      <a href="/" className="mt-6 text-blue-500 hover:underline text-[14px] md:text-[20px]">
        ホームに戻る
      </a>
    </div>
  );
}