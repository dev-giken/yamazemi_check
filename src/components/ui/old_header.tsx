import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-2 fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-xl shadow-lg z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-lg font-bold">
            Yamazemi
          </Link>
        </div>
        <div className="flex space-x-4">
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
      </nav>
    </header>
  );
};

export default Header;