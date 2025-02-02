"use client";

import { FaHome, FaBars } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher"; // Adjust path if needed
import { useTheme } from "next-themes";

/**
 * Navbar - Responsive navigation component with theme toggle and dropdown menu.
 * Includes a home link, theme switcher, and links to main sections.
 * @returns {JSX.Element} Navbar with theme support and dropdown functionality
 */
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Track if theme is mounted to avoid SSR issues
  const dropdownRef = useRef(null);
  const { theme } = useTheme();

  // Set mounted state to true after initial load to enable theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if the current theme is dark
  const isDarkTheme = theme === "dark";

  // Toggle the dropdown menu open/closed state
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`p-4 transition-colors font-cutive-mono ${
        mounted && isDarkTheme ? "bg-darkBackground text-darkText" : "bg-lightBackground text-lightText"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Ensure content only renders after mounting */}
        {mounted && (
          <>
            <div className="hidden flex items-center space-x-4 relative" ref={dropdownRef}>
              {/* Menu Toggle Button */}
              <button
                onClick={toggleDropdown}
                className={`focus:outline-none p-2 rounded transition-colors duration-300 ${
                  isDarkTheme ? "dark:hover:bg-lightAccent" : "hover:bg-darkText"
                }`}
                aria-expanded={isDropdownOpen}
                aria-controls="dropdown-menu"
                aria-haspopup="true"
              >
                <FaBars size={28} className="text-current" />
              </button>

              {/* Home Link */}
              <Link href="/" className="focus:outline-none flex items-center hidden">
                <FaHome
                  size={40}
                  className={`p-2 rounded transition-colors duration-300 ${
                    isDarkTheme ? "dark:hover:bg-lightAccent" : "hover:bg-darkText"
                  }`}
                  aria-label="Home"
                />
              </Link>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  id="dropdown-menu"
                  className={`hidden absolute top-full w-48 shadow-lg border ${
                    isDarkTheme
                      ? "bg-darkBackground text-darkText border-darkBackground"
                      : "bg-lightBackground text-lightText border-lightBorder"
                  } -translate-x-4 mt-2 rounded`}
                  role="menu"
                >
                  {["about", "projects", "uses"].map((page) => (
                    <Link
                      key={page}
                      href={`/${page}`}
                      className="block px-4 py-2 transition-colors duration-300 hover:bg-darkText dark:hover:bg-lightAccent"
                      role="menuitem"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {page.charAt(0).toUpperCase() + page.slice(1)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Switcher */}
            <ThemeSwitcher />
          </>
        )}
      </div>
    </nav>
  );
}
