"use client";

import { FaHome, FaBars } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

/**
 * Navbar component - Renders a responsive navigation bar with theme toggling, dropdown menu, and icons.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  /**
   * Close dropdown when clicking outside of the dropdown area.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Observes changes to the HTML `class` attribute to detect theme changes and update `isDarkTheme`.
   */
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`p-4 transition-colors font-cutive-mono ${isDarkTheme ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={`focus:outline-none flex items-center justify-center p-2 rounded transition-colors duration-300 ${
              isDarkTheme ? 'dark:hover:bg-lightAccent' : 'hover:bg-darkText'
            }`}
            aria-label="Toggle menu"
          >
            <FaBars size={28} className="text-current" />
          </button>
          <Link href="/" className="focus:outline-none flex items-center justify-center" aria-label="Home">
            <FaHome
              size={40}
              className={`p-2 rounded transition-colors duration-300 ${
                isDarkTheme ? 'dark:hover:bg-lightAccent' : 'hover:bg-darkText'
              }`}
            />
          </Link>
          {isDropdownOpen && (
            <div
              className={`absolute top-full w-48 shadow-lg border ${isDarkTheme ? 'bg-darkBackground text-darkText border-darkBackground' : 'bg-lightBackground text-lightText border-lightBorder'} -translate-x-4`}
            >
              <Link href="/about" className="block px-4 py-2 hover:bg-darkText dark:hover:bg-lightAccent" onClick={() => setIsDropdownOpen(false)}>About</Link>
              <Link href="/projects" className="block px-4 py-2 hover:bg-darkText dark:hover:bg-lightAccent" onClick={() => setIsDropdownOpen(false)}>Projects</Link>
              <Link href="/uses" className="block px-4 py-2 hover:bg-darkText dark:hover:bg-lightAccent" onClick={() => setIsDropdownOpen(false)}>Uses</Link>
            </div>
          )}
        </div>
        <ThemeSwitcher darkClassName="dark" />
      </div>
    </nav>
  );
}
