"use client";

import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

export const Button = ({
                         href,                // URL for link if button is used as a link
                         color = "black",     // Button color scheme, defaults to "black"
                         size = "lg",         // Button size, defaults to large ("lg")
                         disabled = false,    // Whether the button is disabled
                         handleClick,         // Function to handle click events
                         children,            // Content within the button
                         customClasses = "",  // Any additional custom classes to apply
                         ...props             // Additional props spread onto component
                       }) => {

  // Base styling applied to all button variants
  const baseClasses = "font-semibold outline-none px-4 py-2 font-[Cutive_Mono]";

  // Light theme classes for black and white button variants
  const blackClasses =
    "text-lightText bg-lightBackground border-lightBorder hover:bg-lightAccent active:text-darkText focus-visible:ring-2 ring-offset-2 ring-offset-darkBackground";
  const whiteClasses =
    "text-darkText bg-lightBackground border-lightBorder hover:bg-lightAccent active:text-lightText focus-visible:ring-2 ring-offset-2 ring-offset-lightBackground";

  // Dark theme classes for black and white button variants
  const blackClassesDark =
    "dark:bg-darkBackground dark:text-darkText dark:border-darkBorder dark:hover:bg-darkAccent dark:active:text-lightText";
  const whiteClassesDark =
    "dark:bg-darkAccent dark:text-lightText dark:border-darkBorder dark:hover:bg-lightAccent dark:active:text-darkText";

  // Classes for the disabled state for each color variant
  const disabledClassesBlack = "bg-gray-500 text-gray-600 cursor-not-allowed";
  const disabledClassesWhite = "bg-gray-300 text-gray-400 cursor-not-allowed";

  // Selects the appropriate color classes based on props and `disabled` status
  const colorClasses =
    color === "black"
      ? `${blackClasses} ${blackClassesDark} ${disabled ? disabledClassesBlack : ""}`
      : `${whiteClasses} ${whiteClassesDark} ${disabled ? disabledClassesWhite : ""}`;

  // Combines all class styles (base, color, custom) into one string using `clsx`
  const classes = clsx(baseClasses, colorClasses, customClasses);

  // If `href` is provided, render the button as a `Link` component
  if (href) {
    return (
      <Link href={disabled ? "" : href} {...props}>
        {/* If disabled, `href` is set to an empty string to disable navigation */}
        <span onClick={handleClick} className={classes}>
          {children}
        </span>
      </Link>
    );
  }

  // Default rendering as a `<button>` element if no `href` is provided
  return (
    <button disabled={disabled} onClick={handleClick} className={classes} {...props}>
      {children}
    </button>
  );
};
