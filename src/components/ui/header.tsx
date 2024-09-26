'use client';

import Link from 'next/link';
import Image from 'next/image'; // 画像用に追加
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);

    // クリーンアップ：イベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-gray-800 text-white fixed shadow-lg z-50 transition-all duration-300 ease-in-out ${
        isTop
          ? 'top-0 left-0 w-full rounded-none py-4 sm:py-6'
          : 'top-2 sm:top-4 left-1/2 w-11/12 rounded-xl transform -translate-x-1/2 py-2 sm:py-4'
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/header/yamazemi_logo_celeste.png"
              alt="山本勲研究会ロゴ"
              width={35}
              height={35}
              className={`mr-2 transform transition-transform duration-300 ease-in-out ${
                menuOpen ? 'scale-90' : 'scale-100'
              }`}
            />
            <span className="font-bold text-base sm:text-lg leading-none">
              山本勲研究会
            </span>
          </Link>
        </div>
        <div className="hidden sm:flex space-x-4">
          <Link href="/about" className="hover:underline">
            山ゼミとは
          </Link>
          <Link href="/activities" className="hover:underline">
            活動紹介
          </Link>
          <Link href="/application" className="hover:underline">
            入ゼミ
          </Link>
          <Link href="/contact" className="hover:underline">
            お問い合わせ
          </Link>
        </div>
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none z-20">
            <div className="flex flex-col justify-between w-6 h-4">
              <span
                className={`block h-0.5 bg-white transform transition duration-500 ease-in-out ${
                  menuOpen ? 'rotate-45 translate-y-[0.425rem]' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white transition duration-500 ease-in-out ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white transform transition duration-500 ease-in-out ${
                  menuOpen ? '-rotate-45 -translate-y-[0.425rem]' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-gray-800 text-white rounded-b-xl shadow-lg">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link href="/about" className="hover:underline" onClick={toggleMenu}>
                山本勲研究会
              </Link>
            </li>
            <li>
              <Link href="/activities" className="hover:underline" onClick={toggleMenu}>
                活動紹介
              </Link>
            </li>
            <li>
              <Link href="/application" className="hover:underline" onClick={toggleMenu}>
                入ゼミ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline" onClick={toggleMenu}>
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}