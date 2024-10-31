"use client";
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeSwitcher({ darkClassName }) {
  const [isDark, setIsDark] = useState(false); // Start in light mode

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add(darkClassName);
      setIsDark(true);
    } else {
      document.documentElement.classList.remove(darkClassName);
      setIsDark(false);
    }
  }, [darkClassName]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove(darkClassName);
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add(darkClassName);
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`${
        isDark ? 'dark:hover:bg-lightAccent' : 'hover:bg-darkText'
      } p-2 rounded transition-colors duration-300 flex items-center`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiSun className="text-lightBackground" size={24} />
      ) : (
        <FiMoon className="text-darkBackground" size={24} />
      )}
    </button>
  );
}
