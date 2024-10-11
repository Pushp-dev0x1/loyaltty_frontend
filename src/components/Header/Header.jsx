import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/prices' },
    { name: 'Contact', path: '#ContactForm' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative w-full bg-white/30 z-10 backdrop-blur-sm text-[#040869] bg-gradient-to-br from-[#F6F6F7] to-[#DCF8FF] selection:text-white selection:bg-[#040869]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <h1 className="font-bold text-lg text-[#040869]">
          <a href="/">Loyaltty</a>
        </h1>
        <nav className="hidden md:block">
          <ul className="inline-flex space-x-4 md:space-x-8">
            {navItems.map(({ name, path }, index) => (
              <li key={index}>
                <a
                  href={path}
                  className="text-base md:text-lg font-semibold text-[#040869] hover:text-[#040869]/80 transition-colors"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:block">
          <button
            onClick={() => navigate("selecttemp")}
            type="button"
            className="rounded-md bg-[#040869] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#040869]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#040869]"
          >
            Get Started
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#040869] p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && isMobile && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4">
            <ul className="space-y-2 flex flex-col items-center">
              {navItems.map(({ name, path }, index) => (
                <li key={index}>
                  <a
                    href={path}
                    className="block text-base font-semibold text-[#040869] hover:text-[#040869]/80 transition-colors py-2"
                    onClick={toggleMenu}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  navigate("selecttemp");
                  toggleMenu();
                }}
                type="button"
                className="mt-4 rounded-md bg-[#040869] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#040869]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#040869]"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
