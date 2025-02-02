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

const WakaTimePieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://wakatime.com/share/@d433fbcd-a22c-46e5-a337-915af96350af/36dd175a-87f1-40d1-9f96-1597ea8bab62.json'
        );

        const languageData = response.data.data;
        const labels = languageData.map((item) => item.name);
        const dataValues = languageData.map((item) => item.percent);

        const lightColors = ['#F2F2F2', '#E5E5E5', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#A6A6A6', '#8C8C8C', '#737373', '#595959', '#404040'];

        const darkColors = ['#F2F2F2', '#E5E5E5', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#A6A6A6', '#8C8C8C', '#737373', '#595959', '#404040'];

        setChartData({
          labels,
          datasets: [
            {
              label: 'Coding Time Breakdown (%)',
              data: dataValues,
              backgroundColor: isDarkTheme ? darkColors : lightColors,
              borderColor: isDarkTheme ? '#FFFFFF' : '#181818',
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

  if (!chartData) {
    return (
      <div className="w-full p-4 rounded-md bg-lightBackground text-gray-800 dark:bg-darkBackground dark:text-gray-400 font-cutive-mono">
        Loading...
      </div>
    );
  }

  const chartSize = {
    width: window.innerWidth >= 1024 ? 400 : window.innerWidth >= 768 ? 300 : 200,
    height: window.innerWidth >= 1024 ? 400 : window.innerWidth >= 768 ? 300 : 200,
  };

  return (
    <div className={`w-full p-4 md:p-6 lg:p-8 rounded-md ${isDarkTheme ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'} font-cutive-mono`}>
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center mb-4 md:mb-8 lg:mb-8">
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
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  label: (context) => {
                    const language = context.label || '';
                    const percentage = context.raw ? context.raw.toFixed(2) : '0.00';
                    return `${language}: ${percentage}% of coding time`;
                  },
                  afterLabel: (context) => {
                    return 'Hover over each section for details';
                  },
                },
                bodyFont: { family: 'Cutive Mono' },
                titleFont: { family: 'Cutive Mono', size: 12 },
                backgroundColor: isDarkTheme ? '#333' : '#fff',
                borderColor: isDarkTheme ? '#FFF' : '#333',
                borderWidth: 1,
                bodyColor: isDarkTheme ? '#FFF' : '#000',
                titleColor: isDarkTheme ? '#FFF' : '#000',
              },
            },
          }}
        /> {/* Properly closed Pie component */}

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

// Define icons and documentation links for each language
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
