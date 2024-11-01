import React, { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components for bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * WakaTimeBarChart Component
 * Renders a bar chart displaying the number of hours spent coding over the past week.
 * The theme is dynamically updated based on the presence of a "dark" class on the HTML element.
 *
 * @component
 * @returns {JSX.Element} Rendered WakaTimeBarChart component.
 */
const WakaTimeBarChart = () => {
  const [chartData, setChartData] = useState(null); // Holds the chart data object
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Determines if the dark theme is active

  /**
   * useEffect to monitor theme changes by observing class attributes on the root HTML element.
   */
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
    };

    // Initialize theme on mount
    updateTheme();

    // Observe the root element for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  /**
   * Fetch WakaTime data from JSONP endpoint and update the chart data.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchJsonp(
          'https://wakatime.com/share/@d433fbcd-a22c-46e5-a337-915af96350af/de46c6b9-0541-461d-a875-34f320f676c0.json'
        );
        const json = await response.json();

        // Map fetched data to chart labels and dataset values
        const labels = json.data.map((item) => {
          const date = new Date(item.range.date);
          date.setDate(date.getDate() + 1); // Adjust for time zone differences
          return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        });

        const data = json.data.map((item) => item.grand_total.total_seconds / 3600); // Convert seconds to hours

        // Set chart data for rendering
        setChartData({
          labels,
          datasets: [
            {
              label: 'Hours Spent Coding',
              data,
              backgroundColor: '#808080',
              borderColor: '#4A4A4A',
              borderWidth: 1,
              hoverBackgroundColor: '#505050', // Darker color on hover for contrast
              hoverBorderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Display loading indicator while data is being fetched
  if (!chartData) {
    return (
      <div className="w-full p-4 rounded-md bg-white text-gray-800 dark:bg-black dark:text-white font-cutive-mono">
        Loading...
      </div>
    );
  }

  // Render the bar chart with configured options
  return (
    <div className={`w-full p-4 md:p-8 rounded-md ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'} font-cutive-mono`}>
      <h2 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-8">
        Week in Code: Hourly Breakdown
      </h2>
      <div className="max-w-full mx-auto" style={{ height: '350px', width: '100%' }}>
        <Bar
          data={{
            ...chartData,
            datasets: chartData.datasets.map((dataset) => ({
              ...dataset,
              backgroundColor: '#808080',
              borderColor: '#4A4A4A',
              hoverBackgroundColor: '#505050', // Darker color for hover effect
              hoverBorderWidth: 2,
            })),
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: isDarkTheme ? '#FFFFFF' : '#333333',
                  font: {
                    family: 'Cutive Mono',
                    size: window.innerWidth < 768 ? 10 : 14, // Responsive font size
                  },
                },
              },
              title: {
                display: true,
                text: 'Last 7 Days',
                color: isDarkTheme ? '#FFFFFF' : '#333333',
                font: {
                  family: 'Cutive Mono',
                  size: window.innerWidth < 768 ? 12 : 16,
                  weight: 'bold',
                },
              },
              tooltip: {
                bodyFont: {
                  family: 'Cutive Mono',
                  size: window.innerWidth < 768 ? 10 : 12,
                },
                callbacks: {
                  label: (context) => `${context.raw.toFixed(2)} hours`, // Display hours with two decimals
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Hours',
                  color: isDarkTheme ? '#FFFFFF' : '#333333',
                  font: {
                    family: 'Cutive Mono',
                    size: window.innerWidth < 768 ? 10 : 14,
                  },
                },
                ticks: {
                  color: isDarkTheme ? '#FFFFFF' : '#333333',
                  font: {
                    family: 'Cutive Mono',
                    size: window.innerWidth < 768 ? 10 : 12,
                  },
                },
                grid: {
                  color: isDarkTheme ? '#666666' : '#E0E0E0',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Days',
                  color: isDarkTheme ? '#FFFFFF' : '#333333',
                  font: {
                    family: 'Cutive Mono',
                    size: window.innerWidth < 768 ? 10 : 14,
                  },
                },
                ticks: {
                  color: isDarkTheme ? '#FFFFFF' : '#333333',
                  font: {
                    family: 'Cutive Mono',
                    size: window.innerWidth < 768 ? 8 : 12,
                  },
                  maxRotation: 45,
                },
                grid: {
                  color: isDarkTheme ? '#666666' : '#E0E0E0',
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
