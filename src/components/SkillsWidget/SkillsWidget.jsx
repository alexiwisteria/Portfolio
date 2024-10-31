"use client"; // Ensures this component renders only on the client-side

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cutive_Mono } from 'next/font/google';

// Configures the Cutive Mono font for a retro-tech look
// Adjust `weight` and `subsets` properties here if further styling changes are needed
const cutiveMono = Cutive_Mono({
  weight: '400',
  subsets: ['latin'],
});

// Main SkillsWidget component
const SkillsWidget = () => {
  // State to hold proficiency data for each language/technology
  const [proficiencyData, setProficiencyData] = useState(null);

  // State to track if rendering is on the client-side, prevents SSR issues
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Activates client-side rendering to avoid SSR issues

    // Asynchronous function to fetch proficiency data from WakaTime API
    const fetchData = async () => {
      try {
        // API call to WakaTime to retrieve coding language statistics
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
          .filter((item) => relevantLanguages.includes(item.name))
          .map((item) => {
            // Converts time percentage to actual hours (modify base hours if needed)
            const actualHours = item.percent * 5.4;
            // Scales to a maximum of 540 hours to get a proficiency percentage
            const proficiency = ((actualHours / 540) * 100).toFixed(2);

            return {
              name: item.name,
              proficiency,
            };
          });

        setProficiencyData(languageData); // Updates state with processed data
      } catch (error) {
        console.error('Error fetching data:', error); // Logs fetch errors
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  // Loading indicator if data isn’t yet available or client isn’t ready
  if (!isClient || !proficiencyData) {
    return <div className="loading text-center text-lightAccent dark:text-darkAccent">Loading...</div>;
  }

  // Main rendering of the widget
  return (
    <div
      className={`p-6 max-w-lg mx-auto rounded-lg transition-colors
                  bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText
                  ${cutiveMono.className}`} // Uses Cutive Mono font
    >
      {/* Title for the widget */}
      <h2 className="text-2xl font-semibold text-center mb-2 text-lightAccent dark:text-darkAccent">
        Coding Language Proficiency
      </h2>
      {/* Subtitle indicating proficiency level measurement */}
      <p className="text-center text-sm text-lightText dark:text-darkBorder mb-6">
        Reflecting progress toward proficiency (based on 540 hours; approx. 2-3 hours/day for 3-6 months)
      </p>

      {/* Container for each individual language proficiency */}
      <div className="space-y-4">
        {proficiencyData.map((language) => (
          // Language proficiency bar wrapper
          <div key={language.name} className="flex items-center justify-between space-x-4">
            {/* Language name styling */}
            <span className="w-24 text-right font-medium text-lightAccent dark:text-darkAccent">
              {language.name}
            </span>
            {/* Background for proficiency bar */}
            <div className="relative w-64 h-4 rounded-lg overflow-hidden bg-lightBorder dark:bg-darkBorder">
              {/* Fills in proficiency bar, width set by proficiency percentage */}
              <div
                className="h-4 bg-lightAccent dark:bg-lightAccent"
                style={{
                  width: `${language.proficiency}%`, // Dynamically sets width by proficiency
                }}
              ></div>
            </div>
            {/* Proficiency percentage display */}
            <span className="w-12 text-right font-semibold text-lightAccent dark:text-darkAccent">
              {language.proficiency}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsWidget;
