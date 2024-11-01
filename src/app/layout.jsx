"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { Cutive_Mono } from "@next/font/google";
import './globals.css';

// Initialize Cutive Mono font with specific weight and subset
const cutiveMono = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Root layout component that manages theme and renders the app layout.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout of the application.
 */
export default function RootLayout({ children }) {
  // State to track if the dark theme is active
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme');
      const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);

      // Set initial theme based on user preference or system setting
      applyTheme(initialTheme);

      // Set up MutationObserver to detect manual theme changes
      const observer = new MutationObserver(handleThemeMutation);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      // Clean up observer on component unmount
      return () => observer.disconnect();
    } catch (error) {
      console.error("Error setting theme preferences:", error);
    }
  }, []);

  /**
   * Applies the specified theme by adding or removing the 'dark' class on the root element.
   * Updates the state to reflect the active theme.
   *
   * @param {boolean} isDarkMode - True if dark theme should be applied, false for light theme.
   */
  const applyTheme = (isDarkMode) => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    setIsDarkTheme(isDarkMode);
  };

  /**
   * Mutation observer callback to synchronize theme state with document class.
   */
  const handleThemeMutation = () => {
    setIsDarkTheme(document.documentElement.classList.contains('dark'));
  };

  return (
    <html lang="en" className={cutiveMono.className}>
    <body
      className={`transition-colors ${
        isDarkTheme ? 'text-darkText bg-darkBackground' : 'text-lightText bg-lightBackground'
      }`}
    >
    <Navbar />
    <main
      className={`min-h-screen my-4 mx-2 sm:my-6 sm:mx-6 md:mx-12 md:my-8 lg:mx-20 lg:my-10 xl:mx-32 xl:my-12 ${
        isDarkTheme ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'
      }`}
    >
      {children}
    </main>
    <Footer className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12" />
    </body>
    </html>
  );
}
