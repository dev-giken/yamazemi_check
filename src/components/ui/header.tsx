'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion_my";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string>("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAccordionChange = (value: string | null) => {
    setOpenAccordion(value  || "");
  };

  return (
    <>
      {/* ヘッダー */}
      <header
        className={`bg-gray-800 text-white fixed shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isTop
            ? 'top-0 left-0 w-full rounded-none py-3 sm:py-4' // デフォルトの高さ
            : 'top-2 sm:top-4 left-1/2 w-11/12 rounded-xl transform -translate-x-1/2 py-2 sm:py-3'
        } ${menuOpen ? 'py-2' : 'py-2'}`}  // バーガーメニューが出現時の高さ調整
      >
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/header/yamazemi_logo_celeste.webp"
                alt="山本勲研究会ロゴ"
                width={35}
                height={35}
                className="mr-2"
              />
              <span className="font-bold text-base sm:text-lg leading-none">
                山本勲研究会
              </span>
            </Link>
          </div>
          {/* 画面サイズが大きい時に直接表示されるリンク */}
          <NavigationMenu className="hidden sm:flex space-x-4 text-sm">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200">ゼミ員</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 text-white p-4 rounded-md shadow-md" style={{ width: '16rem' }}>
                  <ul className="flex flex-col space-y-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/about/students" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          学生紹介
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/about/professor" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          教授紹介
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200">活動</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 text-white p-4 rounded-md shadow-md" style={{ width: '16rem' }}>
                  <ul className="flex flex-col space-y-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/activities/year" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          年間の活動
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/activities/mitaron" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          三田論
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/activities/ws" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          WS
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/activities/obog" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          OB/OGとの関わり
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200">入ゼミ</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 text-white p-4 rounded-md shadow-md" style={{ width: '16rem' }}>
                  <ul className="flex flex-col space-y-2 text-left">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/application/entry" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          エントリー
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/application/exam" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          試験概要
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/application/docs" className="block w-[80%] hover:bg-gray-700 text-white p-2 rounded transition-colors duration-200">
                          説明会資料・先生インタビュー
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className="bg-gray-800 text-white hover:bg-gray-700 p-2 rounded transition-colors duration-200">
                    お問い合わせ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>


          {/* バーガーメニュー */}
          <div className="sm:hidden flex items-center z-60 relative">
            <button onClick={toggleMenu} className="focus:outline-none z-60 relative">
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
      </header>

      {/* スライドインメニュー */}
      <div
        className={`fixed top-0 right-0 w-[250px] bg-black bg-opacity-75 text-white p-4 z-40 transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: '80px', borderBottomLeftRadius: '20px' }} // 左下角に丸みを追加
      >
        <Accordion type="single" collapsible value={openAccordion ?? undefined} onValueChange={handleAccordionChange}>
          <ul className="flex flex-col text-sm">
            <li>
              <AccordionItem value="student-info">
                <AccordionTrigger>
                  ゼミ員
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-4 space-y-2">
                    <li>
                      <Link href="/about/students" onClick={toggleMenu}>
                        学生紹介
                      </Link>
                    </li>
                    <li>
                      <Link href="/about/professor" onClick={toggleMenu}>
                        教授紹介
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="activities">
                <AccordionTrigger>
                  活動
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-4 space-y-2">
                    <li>
                      <Link href="/activities/year" onClick={toggleMenu}>
                        年間の活動
                      </Link>
                    </li>
                    <li>
                      <Link href="/activities/mitaron" onClick={toggleMenu}>
                        三田論
                      </Link>
                    </li>
                    <li>
                      <Link href="/activities/ws" onClick={toggleMenu}>
                        WS
                      </Link>
                    </li>
                    <li>
                      <Link href="/activities/obog" onClick={toggleMenu}>
                        OB/OGとの関わり
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="application">
                <AccordionTrigger>
                  入ゼミ
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="pl-4 space-y-2">
                    <li>
                      <Link href="/application/entry" onClick={toggleMenu}>
                        エントリー
                      </Link>
                    </li>
                    <li>
                      <Link href="/application/exam" onClick={toggleMenu}>
                        試験概要
                      </Link>
                    </li>
                    <li>
                      <Link href="/application/docs" onClick={toggleMenu}>
                        説明会資料・先生インタビュー
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu}>
                お問い合わせ
              </Link>
            </li>
          </ul>
        </Accordion>
      </div>
    </>
  );
}