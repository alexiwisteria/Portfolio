"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";
import clsx from "clsx";

// ThemeProviderWithSwitcher to wrap your application with theme context
export function ThemeProviderWithSwitcher({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light" // Set the default theme to "light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

// ThemeSwitcher button to toggle between light and dark modes
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const buttonClass = clsx(
    "p-2 rounded transition-colors duration-300 flex items-center",
    theme === "dark" ? "dark:hover:bg-lightAccent" : "hover:bg-darkText"
  );

  const Icon = theme === "dark" ? FiSun : FiMoon;

  return (
    <button onClick={toggleTheme} className={buttonClass} aria-label="Toggle theme">
      <Icon className={theme === "dark" ? "text-lightBackground" : "text-darkBackground"} size={24} />
    </button>
  );
}
