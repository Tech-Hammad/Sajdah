import { useEffect, useRef, useState } from 'react';
import assets from '../assets/assets';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-3 top-0 z-20 backdrop-blur-xl font-medium bg-secondary dark:bg-gray-900/70"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* logo */}
      <img
        src={assets.logo}
        className="w-14 sm:w-14 cursor-pointer"
        alt="logo"
      />

      <div
        className={`text-white sm:text-sm ${isMenuOpen
            ? 'max-sm:w-60 max-sm:pl-10'
            : 'max-sm:w-0 max-sm:overflow-hidden'
          } max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:flex-col max-sm:bg-primary max-sm:text-black max-sm:pt-20 flex sm:items-center gap-5 overflow-visible transition-all duration-300 ease-in-out`}
      >
        <img
          src={assets.close_icon}
          alt=""
          className="w-5 absolute right-4 top-4 sm:hidden cursor-pointer"
          onClick={closeMobileMenu}
        />

        <Link to="/" onClick={closeMobileMenu} className='hover:text-yellow-400 transition'>Home</Link>
        <Link to="/Prayer" onClick={closeMobileMenu} className='hover:text-yellow-400 transition'>Salah Tracker</Link>
        <Link to="/TasbeehCounter" onClick={closeMobileMenu} className='hover:text-yellow-400 transition'>Tasbeeh Counter</Link>
        <Link to="/QiblaFinder" onClick={closeMobileMenu} className='hover:text-yellow-400 transition'>Qibla Finder</Link>
        
        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex items-center gap-1 sm:hover:border-b"
            onClick={(e) => {
              e.preventDefault();
              setIsDropdownOpen((prev) => !prev);
            }}
          >
            Pages
            <img
              src={assets.dropdown_icon}
              alt="dropdown"
              className="w-4 h-4 ml-1 filter invert"
            />
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-xl shadow-lg py-2 z-30 dark:bg-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              } transition-all duration-200`}
          >
            <Link 
              to="/Prayer"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Prayer Times
            </Link>
            <Link
              to="/QuranReading"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Quran Reading
            </Link>
            <Link
              to="/DuasAzkar"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Duas &amp; Azkar
            </Link>
            <Link
              to="/IslamicCalendar"
              onClick={closeMobileMenu}
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Islamic Calendar
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <img
          src={assets.menu_icon_dark}
          onClick={() => setIsMenuOpen(true)}
          alt=""
          className="w-8 sm:hidden cursor-pointer"
        />

        <Link
          to="/DownloadApp"
          className="text-sm max-sm:hidden flex items-center gap-2 bg-primary text-dark px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all"
        >
          Download the App
        </Link>
      </div>
    </div>
  );
};

export default Navbar;