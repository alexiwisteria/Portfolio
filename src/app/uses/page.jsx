"use client";

import { useEffect, useState } from "react";

// Define sections and items displayed on the page
const sections = [
  {
    title: "Development Tools",
    items: [
      { label: "Editor", detail: "GitHub Codespaces - My go-to for cloud-based development environments." },
      { label: "IDE (Java)", detail: "IntelliJ - My preferred IDE for Java development and advanced debugging." },
      { label: "IDE (Web)", detail: "WebStorm - Ideal for JavaScript development and web-focused projects." },
      { label: "Version Control", detail: "Git & GitHub - Used for managing and sharing my projects." },
      { label: "Framework", detail: "React & Next.js - My go-to for building responsive web applications." },
      { label: "Testing", detail: "JUnit, Vitest, Playwright - For robust testing and quality assurance." },
    ],
  },
  {
    title: "Design & Prototyping",
    items: [{ label: "Prototyping", detail: "Figma - Creating wireframes and design mockups." }],
  },
  {
    title: "Hardware",
    items: [{ label: "Computer", detail: "MacBook Pro - My main machine for development." }],
  },
  {
    title: "Other Essentials",
    items: [{ label: "Productivity", detail: "Discord - For quick notes." }],
  },
];

/**
 * Uses component - displays a list of tools, hardware, and essentials with theme-based styling.
 * @returns {JSX.Element} The Uses page layout.
 */
export default function Uses() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    /**
     * Updates the theme state based on the presence of the 'dark' class on the <html> element.
     */
    const updateTheme = () => {
      const isDarkModeActive = document.documentElement.classList.contains("dark");
      setIsDarkTheme(isDarkModeActive);
    };

    updateTheme(); // Set initial theme on load

    // Observe changes in the `html` class attribute for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`p-4 sm:p-6 lg:p-8 font-[Cutive Mono] max-w-3xl mx-auto transition-colors duration-300 ${
        isDarkTheme ? "bg-darkBackground text-darkText" : "bg-lightBackground text-lightText"
      }`}
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 text-center">Uses</h1>
      {sections.map((section) => (
        <Section
          key={section.title}
          title={section.title}
          items={section.items}
          isDarkTheme={isDarkTheme}
        />
      ))}
    </div>
  );
}

/**
 * Section component - displays a section title and its items.
 *
 * @param {Object} props
 * @param {string} props.title - The title of the section.
 * @param {Array<Object>} props.items - The items within the section.
 * @param {boolean} props.isDarkTheme - Determines if the dark theme is active.
 * @returns {JSX.Element} The section layout.
 */
function Section({ title, items, isDarkTheme }) {
  return (
    <section
      className={`mt-8 lg:mt-10 w-full transition-colors duration-300 ${
        isDarkTheme ? "bg-darkBackground text-darkText border-darkBorder" : "bg-lightBackground text-lightText border-lightBorder"
      }`}
    >
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4 border-b-2 border-current">
        {title}
      </h2>
      <ul className="space-y-3 sm:space-y-2 lg:space-y-4">
        {items.map((item, index) => (
          <Item
            key={index}
            label={item.label}
            detail={item.detail}
            isDarkTheme={isDarkTheme}
          />
        ))}
      </ul>
    </section>
  );
}

/**
 * Item component - displays a labeled item with details.
 *
 * @param {Object} props
 * @param {string} props.label - The label of the item.
 * @param {string} props.detail - The detail description of the item.
 * @param {boolean} props.isDarkTheme - Determines if the dark theme is active.
 * @returns {JSX.Element} The item layout.
 */
function Item({ label, detail, isDarkTheme }) {
  return (
    <li className="flex items-start transition-colors duration-300">
      <span
        className={`font-semibold mr-2 sm:mr-4 whitespace-pre-line ${
          isDarkTheme ? "text-darkAccent" : "text-lightAccent"
        }`}
      >
        {label}:
      </span>
      <span
        className={`flex-1 ${isDarkTheme ? "text-darkText" : "text-lightText"}`}
      >
        {detail}
      </span>
    </li>
  );
}
