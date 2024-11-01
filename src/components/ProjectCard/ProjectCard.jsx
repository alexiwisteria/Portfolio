"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // Utility function for combining class names

/**
 * ThemeContext provides access to the current theme (dark or light).
 */
const ThemeContext = React.createContext();

/**
 * ThemeProvider component to manage and provide dark/light theme state.
 *
 * @param {Object} props - Props for the provider.
 * @param {React.ReactNode} props.children - Components that need access to theme context.
 */
const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  React.useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    updateTheme(); // Initialize theme on load

    // Observe theme changes on the <html> element
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeContext.Provider value={isDarkTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Base font class for consistent typography
const baseFontClass = "font-cutive-mono";

/**
 * Main ProjectCard component styled as a card with theme support.
 */
const ProjectCard = React.forwardRef(({ className, ...props }, ref) => {
  const isDarkTheme = React.useContext(ThemeContext);

  return (
    <div
      ref={ref}
      className={cn(
        `${baseFontClass} border shadow transition-colors duration-300 ${
          isDarkTheme ? 'border-gray-800 bg-gray-950 text-gray-50' : 'border-gray-200 bg-white text-gray-950'
        }`,
        className
      )}
      {...props}
    />
  );
});
ProjectCard.displayName = "ProjectCard";

/**
 * CardHeader component - Holds the card's header content, typically title and description.
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `${baseFontClass} flex flex-col space-y-1.5 p-6 transition-colors duration-300`,
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle component - Styled as a heading, usually an `h3`.
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      `${baseFontClass} font-semibold leading-none tracking-tight transition-colors duration-300`,
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription component - Smaller text styling for additional information.
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => {
  const isDarkTheme = React.useContext(ThemeContext);

  return (
    <p
      ref={ref}
      className={cn(
        `${baseFontClass} text-sm transition-colors duration-300 ${
          isDarkTheme ? 'text-gray-400' : 'text-gray-500'
        }`,
        className
      )}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

/**
 * CardContent component - Main content section with padding.
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(`${baseFontClass} p-6 pt-0 transition-colors duration-300`, className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter component - Bottom section of the card, often used for actions.
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `${baseFontClass} flex items-center p-6 pt-0 transition-colors duration-300`,
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/**
 * Card component - Wraps ProjectCard in ThemeProvider for consistent theme access.
 */
const Card = React.forwardRef((props, ref) => (
  <ThemeProvider>
    <ProjectCard ref={ref} {...props} />
  </ThemeProvider>
));

export {
  Card,            // Card wrapped with ThemeProvider
  ProjectCard,     // Also export as ProjectCard
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
