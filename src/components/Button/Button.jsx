"use client";

import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

/**
 * Button component - Renders a styled button or link element based on provided props.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.href] - Optional URL for rendering as a link. If provided, the component will render as a link.
 * @param {string} [props.color="black"] - Color scheme of the button ("black" or "white").
 * @param {boolean} [props.disabled=false] - Determines if the button is disabled.
 * @param {Function} [props.onClick] - Click event handler function.
 * @param {React.ReactNode} props.children - Button content.
 * @param {string} [props.customClasses=""] - Additional CSS classes for custom styling.
 * @returns {JSX.Element} The styled button or link element.
 */
export const Button = ({
                         href,
                         color = "black",
                         disabled = false,
                         onClick,
                         children,
                         customClasses = "",
                         ...props
                       }) => {
  // Base styling for all button types
  const baseClasses = "font-semibold outline-none px-4 py-2 font-[Cutive_Mono] border-2";

  // Theme classes based on color scheme and light/dark mode
  const lightModeClasses =
    color === "black"
      ? "text-lightText bg-lightBackground border-lightBorder hover:bg-darkText"
      : "text-darkText bg-lightBackground border-lightBorder hover:bg-darkText";

  const darkModeClasses =
    color === "black"
      ? "dark:text-darkText dark:bg-darkBackground dark:border-darkBorder dark:hover:bg-lightAccent"
      : "dark:text-lightText dark:bg-darkAccent dark:border-darkBorder dark:hover:bg-lightAccent";

  // Styles applied when the button is disabled
  const disabledClasses = "bg-gray-500 text-gray-600 border-gray-500 cursor-not-allowed";

  // Combine all class styles based on props
  const classes = clsx(
    baseClasses,
    lightModeClasses,
    darkModeClasses,
    disabled && disabledClasses,
    customClasses
  );

  // Render as a link if `href` is provided, otherwise as a button
  if (href) {
    return (
      <Link href={disabled ? "#" : href} {...props} aria-disabled={disabled}>
        <span
          onClick={!disabled ? onClick : undefined}
          className={classes}
          role={disabled ? "button" : undefined}
          aria-disabled={disabled}
        >
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};
