"use client";

import { useEffect, useState } from 'react';

const sections = [
  {
    title: "Development Tools",
    items: [
      { label: "Editor", detail: "GitHub Codespaces - My go-to for cloud-based development environments." },
      { label: "IDE (Java)", detail: "IntelliJ - My preferred IDE for Java development and advanced debugging." },
      { label: "IDE (Web)", detail: "WebStorm - Ideal for JavaScript development and web-focused projects." },
      { label: "Version\nControl", detail: "Git & GitHub - Used for managing and sharing my projects." },
      { label: "Framework", detail: "React & Next.js - My go-to for building responsive web applications." },
      { label: "Testing", detail: "JUnit, Vitest, Playwright - For robust testing and quality assurance." },
    ],
  },
  {
    title: "Design & Prototyping",
    items: [
      { label: "Prototyping", detail: "Figma - Creating wireframes and design mockups." },
    ],
  },
  {
    title: "Hardware",
    items: [
      { label: "Computer", detail: "MacBook Pro - My main machine for development." },
    ],
  },
  {
    title: "Other Essentials",
    items: [
      { label: "Productivity", detail: "Discord - For quick notes." },
    ],
  },
];

export default function Uses() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkTheme(isDark);
    };

    updateTheme(); // Initialize theme on load

    // Observe theme changes on the `<html>` element
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`p-6 font-mono max-w-3xl mx-auto transition-colors duration-300 ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Uses</h1>
      {sections.map((section) => (
        <Section key={section.title} title={section.title} items={section.items} isDarkTheme={isDarkTheme} />
      ))}
    </div>
  );
}

function Section({ title, items, isDarkTheme }) {
  return (
    <section className={`mt-10 w-full transition-colors duration-300 ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <Item key={index} label={item.label} detail={item.detail} isDarkTheme={isDarkTheme} />
        ))}
      </ul>
    </section>
  );
}

function Item({ label, detail, isDarkTheme }) {
  return (
    <li className="flex items-start transition-colors duration-300">
      <span className={`font-semibold mr-4 whitespace-pre-line ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>{label}:</span>
      <span className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'} flex-1`}>{detail}</span>
    </li>
  );
}
