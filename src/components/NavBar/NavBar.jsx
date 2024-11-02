"use client";

import { FaHome, FaBars } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher"; // Adjust path if needed
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Track if theme is mounted
  const dropdownRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true); // Ensure theme is ready
  }, []);

  const isDarkTheme = theme === "dark";
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown when clicking outside
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
        {/* Only render content if mounted */}
        {mounted && (
          <>
            <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
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
              <Link href="/" className="focus:outline-none flex items-center">
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
                  className={`absolute top-full w-48 shadow-lg border ${
                    isDarkTheme
                      ? "bg-darkBackground text-darkText border-darkBackground"
                      : "bg-lightBackground text-lightText border-lightBorder"
                  } -translate-x-4 mt-2 rounded`}
                  role="menu"
                >
                  <Link
                    href="/about"
                    className="block px-4 py-2 transition-colors duration-300 hover:bg-darkText dark:hover:bg-lightAccent"
                    role="menuitem"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/projects"
                    className="block px-4 py-2 transition-colors duration-300 hover:bg-darkText dark:hover:bg-lightAccent"
                    role="menuitem"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link
                    href="/uses"
                    className="block px-4 py-2 transition-colors duration-300 hover:bg-darkText dark:hover:bg-lightAccent"
                    role="menuitem"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Uses
                  </Link>
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
