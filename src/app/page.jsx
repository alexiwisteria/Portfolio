"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/Button/Button";
import { Typewriter } from "react-simple-typewriter";
import HomePageImg from "../components/HomePageImage/HomePageImg";
import WakaTimeBarChart from "../components/WakaTimeBarChart/WakaTimeBarChart";
import LanguagePieChart from "../components/WakaTimeLanguagesChart/WakaTimeLanguagesChart";
import { Cutive_Mono } from "@next/font/google";
import Uses from "./uses/page";
import Projects from "./projects/page";
import About from "./about/page";

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
      const isDarkModeActive = document.documentElement.classList.contains("dark");
      setIsDarkTheme(isDarkModeActive);
    };

    // Set initial theme state
    updateTheme();

    // Observe changes in the `html` class attribute for theme toggling
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Define theme-based classes for easy reusability across sections
  const themeClasses = `${
    isDarkTheme
      ? "bg-darkBackground text-darkText"
      : "bg-lightBackground text-lightText"
  } ${cutiveMono.className}`;

  return (
    <div className={themeClasses}>
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center md:flex-row mb-10 md:mb-16 max-w-5xl mx-auto space-y-6 md:space-y-0 px-4"
      >
        <div className="flex-1 md:w-2/3 flex items-center justify-center">
          <div className="min-h-[4rem] md:min-h-[6rem] h-[150px] md:h-[200px] flex items-center justify-center mb-10 md:mb-16">
            <h1
              className={`text-[1.8rem] md:text-[2.8rem] font-bold overflow-hidden break-words max-w-full md:max-w-lg ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            >
              <Typewriter
                words={[
                  "Hello, I'm Alex.",
                  "Code wizard apprentice, always learning.",
                  "Java enthusiast.",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </div>
        </div>
      </section>

      {/* Button Section */}
      <section className="flex justify-center mt-16 md:mt-20 mb-16 md:mb-20 max-w-full md:max-w-5xl mx-auto px-4">
        <Button
          href="/projects"
          customClasses={`extra-class text-md md:text-lg ${themeClasses}`}
          onClick={() => console.log("Projects Portal button clicked!")}
        >
          Projects Portal
        </Button>
      </section>

      {/* Weekly Coding Bar Chart Section */}
      <section
        className={`mb-8 md:mb-12 max-w-full md:max-w-5xl mx-auto px-4 ${themeClasses}`}
      >
        <WakaTimeBarChart />
      </section>

      {/* Language Pie Chart Section */}
      <section
        className={`mb-8 md:mb-12 max-w-full md:max-w-5xl mx-auto px-4 ${themeClasses}`}
      >
        <LanguagePieChart />
      </section>

      {/* Projects Section */}
      <section
        className={`mb-8 md:mb-12 max-w-full md:max-w-5xl mx-auto px-4 ${themeClasses}`}
      >
        <Projects />
      </section>

      {/* About Section */}
      <section
        className={`mb-8 md:mb-12 max-w-full md:max-w-5xl mx-auto px-4 ${themeClasses}`}
      >
        <About />
      </section>

      {/* Uses Section */}
      <section
        className={`mb-8 md:mb-12 max-w-full md:max-w-5xl mx-auto px-4 ${themeClasses}`}
      >
        <Uses />
      </section>
    </div>
  );
};

export default Home;
