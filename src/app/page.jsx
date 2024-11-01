"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Typewriter } from 'react-simple-typewriter';
import HomePageImg from '../components/HomePageImage/HomePageImg';
import WakaTimeBarChart from '../components/WakaTimeBarChart/WakaTimeBarChart';
import LanguagePieChart from '../components/WakaTimeLanguagesChart/WakaTimeLanguagesChart';
import { Cutive_Mono } from "@next/font/google";

// Initialize Cutive Mono font
const cutiveMono = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
});

/**
 * Home component showcasing introductory text, image, and charts with theme handling.
 *
 * @returns {JSX.Element} The Home page layout with theme-based styling.
 */
const Home = () => {
  // State to manage theme, initializing as false (light theme by default)
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    /**
     * Updates the theme state based on the presence of the 'dark' class on the `html` element.
     */
    const updateTheme = () => {
      const isDarkModeActive = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDarkModeActive);
    };

    // Set initial theme state
    updateTheme();

    // Observe changes in the `html` class attribute for theme toggling
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Define theme-based classes for easy reusability across sections
  const themeClasses = `${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300 ${cutiveMono.className}`;

  return (
    <div className={`container mx-auto p-4 md:p-8 ${themeClasses}`}>

      {/* Intro Section */}
      <section className="flex flex-col md:flex-row items-center mb-10 md:mb-16 max-w-5xl mx-auto space-y-6 md:space-y-0 px-4">
        <div className="flex-1 md:w-2/3">
          <div className="min-h-[4rem] md:min-h-[6rem] h-[150px] md:h-[200px] flex items-center mb-10 md:mb-16">
            <h1 className={`text-[1.8rem] md:text-[2.8rem] font-bold overflow-hidden break-words max-w-full md:max-w-lg whitespace-pre-wrap ${isDarkTheme ? 'text-white' : 'text-black'}`}>
              <Typewriter
                words={['Hello, I\'m Alex.', 'Code wizard in training.', 'Java lover, bug slayer.']}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </div>
        </div>
        <div className="flex-1 flex justify-center mt-4 md:mt-0 md:w-1/3 max-w-xs md:max-w-sm">
          <HomePageImg />
        </div>
      </section>

      {/* Button Section */}
      <section className="flex justify-center mt-16 md:mt-20 mb-16 md:mb-20 max-w-full md:max-w-5xl mx-auto px-4">
        <Button
          href="/projects"
          customClasses={`extra-class text-md md:text-lg ${themeClasses}`}
          handleClick={() => console.log("Projects Portal button clicked!")}
        >
          Projects Portal
        </Button>
      </section>

      {/* Weekly Coding Bar Chart Section */}
      <section className={`mb-8 md:mb-12 max-w-full md:max-w-5xl mx-auto px-4 ${themeClasses}`}>
        <WakaTimeBarChart />
      </section>

      {/* Language Pie Chart Section */}
      <section className={`mb-8 md:mb-12 max-w-full md:max-w-5xl mx-auto px-4 ${themeClasses}`}>
        <LanguagePieChart />
      </section>
    </div>
  );
};

export default Home;
