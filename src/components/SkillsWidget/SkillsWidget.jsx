"use client"; // Ensures this component renders only on the client-side

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cutive_Mono } from 'next/font/google';

// Configures the Cutive Mono font for a retro-tech look
const cutiveMono = Cutive_Mono({
  weight: '400',
  subsets: ['latin'],
});

/**
 * SkillsWidget component - Displays a proficiency widget for coding languages and technologies,
 * sourced from the WakaTime API and dynamically rendered based on theme and client state.
 */
const SkillsWidget = () => {
  const [proficiencyData, setProficiencyData] = useState(null); // Holds proficiency data
  const [isClient, setIsClient] = useState(false); // Tracks client-side rendering status

  useEffect(() => {
    setIsClient(true); // Activates client-side rendering to avoid SSR issues

    /**
     * Fetches proficiency data from WakaTime API and filters for relevant languages.
     */
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wakatime.com/share/@d433fbcd-a22c-46e5-a337-915af96350af/85f200f4-ca48-4103-af6c-05702458ffe1.json'
        );

        // Languages/technologies relevant to this widget
        const relevantLanguages = [
          'Java', 'Git', 'JavaScript', 'React', 'Next.js',
          'JUnit', 'Vitest', 'Playwright', 'Python', 'HTML', 'CSS'
        ];

        // Filters and formats data for relevant languages only
        const languageData = response.data.data
          .filter(item => relevantLanguages.includes(item.name))
          .map(item => ({
            name: item.name,
            proficiency: ((item.percent * 5.4 / 540) * 100).toFixed(2), // Converts percent to hours to proficiency %
          }));

        setProficiencyData(languageData); // Updates state with processed data
      } catch (error) {
        console.error('Error fetching data:', error); // Logs fetch errors
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  // Loading state for data or client-side readiness
  if (!isClient || !proficiencyData) {
    return <div className="loading text-center text-lightAccent dark:text-darkAccent">Loading...</div>;
  }

  // Renders the SkillsWidget with language proficiency bars
  return (
    <div
      className={`p-4 sm:p-6 max-w-full sm:max-w-lg mx-auto rounded-lg transition-colors
                  bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText
                  ${cutiveMono.className}`} // Applies Cutive Mono font
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2 text-lightAccent dark:text-darkAccent">
        Coding Language Proficiency
      </h2>
      <p className="text-center text-xs sm:text-sm text-lightText dark:text-darkBorder mb-4 sm:mb-6">
        Reflecting progress toward proficiency (based on 540 hours; approx. 2-3 hours/day for 3-6 months)
      </p>

      <div className="space-y-4">
        {proficiencyData.map(language => (
          <div key={language.name} className="flex items-center justify-between space-x-2 sm:space-x-4">
            <span className="w-16 sm:w-24 text-right text-xs sm:text-base font-medium text-lightAccent dark:text-darkAccent">
              {language.name}
            </span>
            <div className="relative w-40 sm:w-64 h-3 sm:h-4 rounded-lg overflow-hidden bg-lightBorder dark:bg-darkBorder">
              <div
                className="h-3 sm:h-4 bg-lightAccent dark:bg-lightAccent"
                style={{ width: `${language.proficiency}%` }} // Dynamically sets width based on proficiency
              ></div>
            </div>
            <span className="w-8 sm:w-12 text-right text-xs sm:text-base font-semibold text-lightAccent dark:text-darkAccent">
              {language.proficiency}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsWidget;
