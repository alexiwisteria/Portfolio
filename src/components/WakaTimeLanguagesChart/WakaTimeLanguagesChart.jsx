"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  FaPython, FaJsSquare, FaJava, FaPhp, FaHtml5, FaCss3Alt, FaSwift, FaFileCode
} from 'react-icons/fa';
import { VscJson } from 'react-icons/vsc';
import { SiMarkdown } from 'react-icons/si';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * WakaTimePieChart Component
 * Renders a Pie chart displaying coding time percentages for various languages.
 * Fetches data from WakaTime API and adapts theme based on user settings.
 *
 * @component
 * @returns {JSX.Element} WakaTimePieChart component
 */
const WakaTimePieChart = () => {
  const [chartData, setChartData] = useState(null); // Stores chart data
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Tracks theme

  /**
   * Updates theme state based on the presence of a 'dark' class on <html>.
   */
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    // Watch for changes to <html> class attribute for theme updates
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  /**
   * Fetches language data from WakaTime API and processes it for chart display.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wakatime.com/share/@d433fbcd-a22c-46e5-a337-915af96350af/36dd175a-87f1-40d1-9f96-1597ea8bab62.json'
        );

        const languageData = response.data.data;
        const labels = languageData.map((item) => item.name);
        const dataValues = languageData.map((item) => item.percent);

        const lightColors = ['#262626', '#404040', '#595959', '#737373', '#8c8c8c', '#a6a6a6'];
        const darkColors = ['#ffffff', '#d6d6d6', '#bdbdbd', '#a3a3a3', '#8a8a8a', '#757575'];

        setChartData({
          labels,
          datasets: [
            {
              label: 'Coding Time Breakdown (%)',
              data: dataValues,
              backgroundColor: isDarkTheme ? darkColors : lightColors,
              borderColor: isDarkTheme ? '#FFFFFF' : '#4A4A4A',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isDarkTheme]);

  // Display loading state if chart data is still loading
  if (!chartData) {
    return (
      <div className="w-full p-4 rounded-md bg-white text-gray-800 dark:bg-black dark:text-gray-400 font-cutive-mono">
        Loading...
      </div>
    );
  }

  /**
   * Determine chart size dynamically based on screen width.
   */
  const chartSize = {
    width: window.innerWidth >= 1024 ? 400 : window.innerWidth >= 768 ? 300 : 200,
    height: window.innerWidth >= 1024 ? 400 : window.innerWidth >= 768 ? 300 : 200,
  };

  return (
    <div className={`w-full p-4 md:p-6 lg:p-8 rounded-md transition-colors ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'} font-cutive-mono`}>
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center mb-4 lg:mb-8">
        Dev Spectrum: This Week in Code
      </h2>
      <div className="flex justify-center mx-auto">
        <Pie
          data={chartData}
          width={chartSize.width}
          height={chartSize.height}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Language Breakdown by Percentage (%)',
                color: isDarkTheme ? '#FFFFFF' : '#333333',
                font: { family: 'Cutive Mono', size: 14, weight: 'bold' },
              },
              tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: (context) => `${context.label || ''}: ${context.raw.toFixed(2)}%`,
                },
                bodyFont: { family: 'Cutive Mono' },
                titleFont: { family: 'Cutive Mono', size: 12 },
              },
            },
          }}
        />
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        {chartData.labels.map((language, index) => (
          <div
            key={language}
            className="flex items-center m-2 text-xs sm:text-sm lg:text-md font-medium"
            style={{
              color: chartData.datasets[0].backgroundColor[index],
              filter: isDarkTheme ? 'brightness(1.5)' : 'brightness(0.8)',
            }}
          >
            <a
              href={documentationLinks[language] || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-xl mr-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {languageIcons[language] || <FaFileCode />}
            </a>
            {language}
          </div>
        ))}
      </div>
    </div>
  );
};

// Mapping language names to icons
const languageIcons = {
  Python: <FaPython />,
  JavaScript: <FaJsSquare />,
  Java: <FaJava />,
  PHP: <FaPhp />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  Swift: <FaSwift />,
  JSON: <VscJson />,
  Markdown: <SiMarkdown />,
};

// Mapping language names to documentation links
const documentationLinks = {
  Python: 'https://docs.python.org/3/',
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  Java: 'https://docs.oracle.com/javase/8/docs/',
  PHP: 'https://www.php.net/docs.php',
  HTML: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  CSS: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  Swift: 'https://developer.apple.com/documentation/swift',
  JSON: 'https://www.json.org/json-en.html',
  Markdown: 'https://www.markdownguide.org/',
};

export default WakaTimePieChart;
