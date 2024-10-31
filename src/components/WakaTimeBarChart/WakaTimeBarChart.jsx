import React, { useEffect, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WakaTimeBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
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
        const response = await fetchJsonp(
          'https://wakatime.com/share/@d433fbcd-a22c-46e5-a337-915af96350af/de46c6b9-0541-461d-a875-34f320f676c0.json'
        );

        const json = await response.json();

        const labels = json.data.map((item) => {
          const date = new Date(item.range.date);
          date.setDate(date.getDate() + 1);
          return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        });

        const data = json.data.map((item) => item.grand_total.total_seconds / 3600);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Hours Spent Coding (Last 7 Days)',
              data,
              backgroundColor: '#808080',
              borderColor: '#4A4A4A',
              borderWidth: 1,
              hoverBackgroundColor: '#505050', // Darker color on hover for better contrast
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

  if (!chartData) {
    return (
      <div className="w-full p-4 rounded-md bg-white text-gray-800 dark:bg-black dark:text-white font-cutive-mono">
        Loading...
      </div>
    );
  }

  return (
    <div className={`w-full p-4 md:p-8 rounded-md transition-colors ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'} font-cutive-mono`}>
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
                  // Custom tooltip label formatting
                  label: (context) => `${context.raw.toFixed(2)} hours`, // Display time to two decimal places
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
