"use client";

import React from "react";
import CodeComputer from './CodeComputer.svg'; // Import SVG component for display

// Functional component to render an image on the homepage
export default function HomePageImg() {
  return (
    <div className="flex items-center justify-center"> {/* Center the image both horizontally and vertically */}
      <CodeComputer className="w-80 h-auto" /> {/* Render SVG with width and automatic height for responsive scaling */}
    </div>
  );
}
