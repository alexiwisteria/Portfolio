"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cutive_Mono } from 'next/font/google';

const cutiveMono = Cutive_Mono({ subsets: ['latin'], weight: '400' });

/**
 * SkillsWidget component - Displays a proficiency widget for coding languages and technologies,
 * sourced from the WakaTime API and dynamically rendered based on theme and client state.
 */
const SkillsWidget = () => {
  const [proficiencyData, setProficiencyData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wakatime.com/share/@d433fbcd-a22c-46e5-a337-915af96350af/85f200f4-ca48-4103-af6c-05702458ffe1.json'
        );

        const relevantLanguages = [
          'Java', 'Git', 'JavaScript', 'React', 'Next.js',
          'JUnit', 'Vitest', 'Playwright', 'Python', 'HTML', 'CSS'
        ];

        const languageData = response.data.data
          .filter(item => relevantLanguages.includes(item.name))
          .map(item => ({
            name: item.name,
            proficiency: ((item.percent * 5.4 / 540) * 100).toFixed(2),
          }));

        setProficiencyData(languageData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!isClient || !proficiencyData) {
    return <div className="loading text-center text-lightAccent dark:text-darkAccent">Loading...</div>;
  }

  return (
    <div
      className={`skills-widget w-full max-w-lg p-4 sm:p-6 mx-auto rounded-lg
                  bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText
                  ${cutiveMono.className}`}
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-lightAccent dark:text-darkAccent text-left">
        Coding Language Proficiency
      </h2>
      <p className="text-left text-xs sm:text-sm text-lightText dark:text-darkBorder mb-4 sm:mb-6">
        Reflecting progress toward proficiency (based on 540 hours; approx. 2-3 hours/day for 3-6 months)
      </p>

      <div className="space-y-4 -translate-x-8 w-">
        {proficiencyData.map(language => (
          <div key={language.name} className="flex items-center justify-start space-x-2 sm:space-x-4">
            <span className="w-16 sm:w-24 text-left text-xs sm:text-base font-medium text-lightAccent dark:text-darkAccent">
              {language.name}
            </span>
            <div className="relative flex-1 h-3 sm:h-4 rounded-lg overflow-hidden bg-lightBorder dark:bg-darkBorder">
              <div
                className="h-3 sm:h-4 bg-lightAccent dark:bg-darkAccent"
                style={{ width: `${language.proficiency}%` }}
              ></div>
            </div>
            <span className="w-8 sm:w-12 text-left text-xs sm:text-base font-semibold text-lightAccent dark:text-darkAccent">
              {language.proficiency}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsWidget;
