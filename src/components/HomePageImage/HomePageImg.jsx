"use client";

import React from "react";
import CodeComputer from './CodeComputer.svg'; // Import SVG component for display

/**
 * HomePageImg component - Renders a centered SVG image on the homepage.
 *
 * @returns {JSX.Element} The rendered homepage image component.
 */
export default function HomePageImg() {
  return (
    <div className="flex items-center justify-center h-full"> {/* Centers image both horizontally and vertically */}
      <CodeComputer className="w-80 h-auto" /> {/* Renders SVG with fixed width and responsive height */}
    </div>
  );
}
