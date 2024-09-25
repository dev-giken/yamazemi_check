'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-2 fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-xl shadow-lg z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-lg font-bold">
            Yamazemi
          </Link>
        </div>
        <div className="hidden sm:flex space-x-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/activities" className="hover:underline">
            Activities
          </Link>
          <Link href="/application" className="hover:underline">
            Application
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className={`relative z-20 focus:outline-none ${
              menuOpen ? 'open' : ''
            } w-10 h-10`}
          >
            <div className="block w-6 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-500 ease-in-out ${
                  menuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-500 ease-in-out ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-500 ease-in-out ${
                  menuOpen ? '-rotate-45' : 'translate-y-1.5'
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
                About
              </Link>
            </li>
            <li>
              <Link href="/activities" className="hover:underline" onClick={toggleMenu}>
                Activities
              </Link>
            </li>
            <li>
              <Link href="/application" className="hover:underline" onClick={toggleMenu}>
                Application
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}