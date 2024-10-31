"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { Cutive_Mono } from "@next/font/google";
import './globals.css';

const cutiveMono = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme === 'dark' : prefersDark;

    document.documentElement.classList.toggle('dark', initialTheme);
    setIsDarkTheme(initialTheme);

    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
    };

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <html lang="en" className={`${cutiveMono.className}`}>
    <body className={`transition-colors duration-300 ${isDarkTheme ? 'text-darkText bg-darkBackground' : 'text-lightText bg-lightBackground'}`}>
    <Navbar />
    <main className={`min-h-screen my-4 mx-2 sm:my-6 sm:mx-4 md:my-8 md:mx-6 lg:my-10 lg:mx-8 xl:my-12 xl:mx-10
                          ${isDarkTheme ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}>
      {children}
    </main>
    <Footer className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14" />
    </body>
    </html>
  );
}
