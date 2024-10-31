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
    // Set theme based on system preference or previous choice
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
    <main className={`min-h-screen my-8 mx-4 sm:mx-12 sm:my-10 md:mx-24 md:my-12 lg:mx-48 lg:my-14 xl:mx-96 xl:my-16 ${isDarkTheme ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}>
      {children}
    </main>
    <Footer className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16" />
    </body>
    </html>
  );
}
