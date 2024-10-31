"use client"; // Required for client-side rendering in Next.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaPython, FaJsSquare, FaJava, FaPhp, FaHtml5, FaCss3Alt, FaSwift, FaFileCode } from 'react-icons/fa';
import { VscJson } from 'react-icons/vsc';
import { SiMarkdown } from 'react-icons/si';

// Register necessary components with ChartJS for pie chart functionality
ChartJS.register(ArcElement, Tooltip, Legend);

const WakaTimePieChart = () => {
  const [chartData, setChartData] = useState(null); // State to hold data for the chart
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State to track the theme (dark or light)

  // Check the theme from the `html` class and set `isDarkTheme` accordingly
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark'); // Check for 'dark' class on `html` element
      setIsDarkTheme(isDark);
    };

    // Initialize theme on component mount
    updateTheme();

    // Observe changes to the `class` attribute on `html` to detect theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Clean up observer when component unmounts
    return () => observer.disconnect();
  }, []);

  // Fetch data from the WakaTime API and set chart data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API request to fetch language usage data from WakaTime
        const response = await axios.get(
          'https://wakatime.com/share/@d433fbcd-a22c-46e5-a337-915af96350af/36dd175a-87f1-40d1-9f96-1597ea8bab62.json'
        );

        // Extract and format API data for the pie chart
        const languageData = response.data.data;
        const labels = languageData.map((item) => item.name); // Language names as labels
        const dataValues = languageData.map((item) => item.percent); // Percentage usage for each language

        // Define color palettes for dark and light themes
        const lightColors = ['#262626', '#404040', '#595959', '#737373', '#8c8c8c', '#a6a6a6'];
        const darkColors = ['#ffffff', '#d6d6d6', '#bdbdbd', '#a3a3a3', '#8a8a8a', '#757575'];

        // Update state with chart data and theme-based colors
        setChartData({
          labels,
          datasets: [
            {
              label: 'Coding Time Breakdown (%)', // Label for the dataset
              data: dataValues, // Data values (language percentages)
              backgroundColor: isDarkTheme ? darkColors : lightColors, // Theme-specific colors
              borderColor: isDarkTheme ? '#FFFFFF' : '#4A4A4A', // White for dark theme, dark gray for light theme
              borderWidth: 1, // Border width for each segment
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors in fetching data
      }
    };

    fetchData(); // Call fetchData function to retrieve chart data on mount
  }, [isDarkTheme]); // Re-run effect if theme changes

  // Display loading text while data is being fetched
  if (!chartData) {
    return (
      <div className="w-full p-4 rounded-md bg-white text-gray-800 dark:bg-black dark:text-gray-400 font-cutive-mono">
        Loading...
      </div>
    );
  }

  return (
    <div className={`w-full p-8 rounded-md transition-colors  ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'} font-cutive-mono`}>
      <h2 className="text-xl font-semibold text-center mb-8">
        Dev Spectrum: This Week in Code
      </h2>
      <div className="max-w-lg mx-auto">
        {/* Render the Pie chart using ChartJS */}
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false, // Hide default legend in favor of custom legend with icons
              },
              title: {
                display: true,
                text: 'Language Breakdown by Percentage (%)',
                color: isDarkTheme ? '#FFFFFF' : '#333333', // Theme-based title color
                font: {
                  family: 'Cutive Mono', // Apply Cutive Mono font
                  size: 16,
                  weight: 'bold',
                },
              },
              tooltip: {
                callbacks: {
                  // Tooltip displays language name and percentage
                  label: function (context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    return `${label}: ${value.toFixed(2)}%`;
                  },
                },
                bodyFont: {
                  family: 'Cutive Mono', // Apply Cutive Mono font to tooltip text
                },
                titleFont: {
                  family: 'Cutive Mono', // Apply Cutive Mono font
                  size: 14,
                },
              },
            },
          }}
        />
      </div>

      {/* Custom Legend with Icons and Documentation Links */}
      <div className="flex flex-wrap justify-center mt-4">
        {chartData.labels.map((language, index) => (
          <div
            key={language}
            className="flex items-center m-2 text-sm font-medium"
            style={{
              color: chartData.datasets[0].backgroundColor[index], // Color for each legend item
              filter: isDarkTheme ? 'brightness(1.5)' : 'brightness(0.8)', // Adjust color brightness for theme
            }}
          >
            <a
              href={documentationLinks[language] || '#'} // Link to documentation if available, fallback to '#'
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl mr-2"
            >
              {languageIcons[language] || <FaFileCode />} {/* Use specific icon if available, fallback to generic code icon */}
            </a>
            {language} {/* Display language name */}
          </div>
        ))}
      </div>
    </div>
  );
};

// Icons for specific languages, with a generic icon as fallback
const languageIcons = {
  'Python': <FaPython />,
  'JavaScript': <FaJsSquare />,
  'Java': <FaJava />,
  'PHP': <FaPhp />,
  'HTML': <FaHtml5 />,
  'CSS': <FaCss3Alt />,
  'Swift': <FaSwift />,
  'JSON': <VscJson />,
  'Markdown': <SiMarkdown />,
};

// Links to official documentation for each language
const documentationLinks = {
  'Python': 'https://docs.python.org/3/',
  'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'Java': 'https://docs.oracle.com/javase/8/docs/',
  'PHP': 'https://www.php.net/docs.php',
  'HTML': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  'CSS': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  'Swift': 'https://developer.apple.com/documentation/swift',
  'JSON': 'https://www.json.org/json-en.html',
  'Markdown': 'https://www.markdownguide.org/',
};

export default WakaTimePieChart;
