"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button/Button';
import { Typewriter } from 'react-simple-typewriter';
import HomePageImg from '../components/HomePageImage/HomePageImg';
import WakaTimeBarChart from '../components/WakaTimeBarChart/WakaTimeBarChart';
import LanguagePieChart from '../components/WakaTimeLanguagesChart/WakaTimeLanguagesChart';
import { Cutive_Mono } from "@next/font/google";

// Import Cutive Mono font
const cutiveMono = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
});

const Home = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check theme from `html` class and set `isDarkTheme`
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
    };

    // Initialize theme
    updateTheme();

    // Observe changes to the class list on `html`
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`container mx-auto p-8 transition-colors duration-300 ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'} ${cutiveMono.className}`}>

      {/* Intro Section */}
      <section className="flex flex-col md:flex-row items-center mb-16 md:mb-24 max-w-5xl mx-auto space-y-8 md:space-y-0">
        <div className="flex-1 md:w-2/3">
          <div className="min-h-[6rem] h-[200px] flex items-center mb-16 md:mb-20">
            <h1 className={`text-[2.8rem] md:text-[3rem] font-bold overflow-hidden break-words max-w-lg whitespace-pre-wrap ${isDarkTheme ? 'text-white' : 'text-black'}`}>
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
        <div className="flex-1 flex justify-center mt-8 md:mt-0 md:w-1/3 max-w-sm">
          <HomePageImg />
        </div>
      </section>

      {/* Button Section */}
      <section className="flex justify-center mt-20 mb-20 max-w-5xl mx-auto">
        <Button
          href="/projects"
          customClasses={`extra-class text-lg md:text-xl transition-colors duration-300 ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}
          handleClick={() => console.log("Button clicked!")}
        >
          Projects Portal
        </Button>
      </section>

      {/* Weekly Coding Bar Chart Section */}
      <section className={`mb-12 max-w-5xl mx-auto px-6 transition-colors duration-300 ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <WakaTimeBarChart />
      </section>

      {/* Language Pie Chart Section */}
      <section className={`mb-12 max-w-5xl mx-auto px-6 transition-colors duration-300 ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <LanguagePieChart />
      </section>
    </div>
  );
};

export default Home;
