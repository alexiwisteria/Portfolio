"use client"; // Required for client-side rendering in Next.js

import React, { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp'; // JSONP library for fetching data from external APIs with JSONP support
import { Bar } from 'react-chartjs-2'; // Import the Bar component for rendering charts
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components with ChartJS for bar chart functionality
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WakaTimeBarChart = () => {
  const [chartData, setChartData] = useState(null); // State to hold chart data after fetching
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State to track the theme (dark or light)

  // Check theme from `html` class and set `isDarkTheme`
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark'); // Check for 'dark' class on `html` element
      setIsDarkTheme(isDark); // Update theme state
    };

    // Initialize theme on component mount
    updateTheme();

    // Observer to detect changes in theme by monitoring `class` attribute on `html`
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'], // Only watch for changes to the `class` attribute
    });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Fetch data from the WakaTime API and set chart data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use fetchJsonp to request JSONP data from the WakaTime endpoint
        const response = await fetchJsonp(
          'https://wakatime.com/share/@d433fbcd-a22c-46e5-a337-915af96350af/de46c6b9-0541-461d-a875-34f320f676c0.json'
        );

        const json = await response.json();

        // Map each day’s date and coding time into format suitable for chart labels
        const labels = json.data.map((item) => {
          const date = new Date(item.range.date);
          date.setDate(date.getDate() + 1); // Offset date by 1 day for display purposes
          return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        });

        // Convert coding time from seconds to hours for each day
        const data = json.data.map((item) => item.grand_total.total_seconds / 3600);

        // Update state with formatted data for the chart
        setChartData({
          labels,
          datasets: [
            {
              label: 'Hours Spent Coding (Last 7 Days)', // Dataset label for chart legend
              data, // Coding hours per day in hours
              backgroundColor: '#808080', // Gray bars, neutral for both themes
              borderColor: '#4A4A4A',      // Darker gray for bar borders
              borderWidth: 1, // Border width for bars
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error); // Log error if fetch fails
      }
    };

    fetchData(); // Call function to fetch data on component mount
  }, []);

  // Display loading text if the chart data hasn't loaded yet
  if (!chartData) {
    return (
      <div className="w-full p-4 rounded-md bg-white text-gray-800 dark:bg-black dark:text-white font-cutive-mono">
        Loading...
      </div>
    );
  }

  return (
    <div className={`w-full p-8 rounded-md transition-colors ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'} font-cutive-mono`}>
      <h2 className="text-xl font-semibold text-center mb-8">
        Week in Code: Hourly Breakdown
      </h2>
      <div className="max-w-6xl mx-auto" style={{ height: '500px', width: '100%' }}>
        {/* Render the Bar chart using ChartJS */}
        <Bar
          data={{
            ...chartData, // Spread chartData to apply the theme-based color settings below
            datasets: chartData.datasets.map((dataset) => ({
              ...dataset,
              backgroundColor: '#808080', // Consistent bar color across themes
              borderColor: '#4A4A4A',     // Consistent bar border color across themes
            })),
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Allows custom height and width
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: isDarkTheme ? '#FFFFFF' : '#333333', // Adjust legend text color based on theme
                  font: {
                    family: 'Cutive Mono', // Apply Cutive Mono font to legend text
                    size: 14,
                  },
                },
              },
              title: {
                display: true,
                text: 'Last 7 Days', // Title for the chart
                color: isDarkTheme ? '#FFFFFF' : '#333333', // Adjust title color based on theme
                font: {
                  family: 'Cutive Mono', // Apply Cutive Mono font to title
                  size: 16,
                  weight: 'bold',
                },
              },
              tooltip: {
                bodyFont: {
                  family: 'Cutive Mono', // Apply Cutive Mono font to tooltip text
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true, // Start y-axis at 0 for clarity
                title: {
                  display: true,
                  text: 'Hours', // Label for y-axis
                  color: isDarkTheme ? '#FFFFFF' : '#333333', // Adjust y-axis label color based on theme
                  font: {
                    family: 'Cutive Mono', // Apply Cutive Mono font
                    size: 14,
                  },
                },
                ticks: {
                  color: isDarkTheme ? '#FFFFFF' : '#333333', // Adjust tick color based on theme
                  font: {
                    family: 'Cutive Mono', // Apply Cutive Mono font
                  },
                },
                grid: {
                  color: isDarkTheme ? '#666666' : '#E0E0E0', // Dark gray for dark theme, light gray for light theme
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Days', // Label for x-axis
                  color: isDarkTheme ? '#FFFFFF' : '#333333', // Adjust x-axis label color based on theme
                  font: {
                    family: 'Cutive Mono', // Apply Cutive Mono font
                    size: 14,
                  },
                },
                ticks: {
                  color: isDarkTheme ? '#FFFFFF' : '#333333', // Adjust tick color based on theme
                  font: {
                    family: 'Cutive Mono', // Apply Cutive Mono font
                  },
                },
                grid: {
                  color: isDarkTheme ? '#666666' : '#E0E0E0', // Dark gray for dark theme, light gray for light theme
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default WakaTimeBarChart;
