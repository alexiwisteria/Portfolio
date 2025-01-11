"use client";

import React from "react";

/**
 * HomePageImg component - Renders a centered image on the homepage.
 *
 * @returns {JSX.Element} The rendered homepage image component.
 */
export default function HomePageImg() {
  return (
    <div className="flex items-center justify-center h-full">
      <img
        src="/my-notion-face-transparent.png"
        alt="Profile Picture"
        className="w-100 h-auto"
      />
    </div>
  );
}
