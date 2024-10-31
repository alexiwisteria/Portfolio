"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // Utility function for combining class names

// Theme context for managing and providing dark/light theme
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    React.useEffect(() => {
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
        <ThemeContext.Provider value={isDarkTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

// Base font class to apply a consistent font across components
const baseFontClass = "font-cutive-mono";

// Main ProjectCard component styled as a card with dark and light theme support
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

// CardHeader component, typically holds the card's title and description
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

// CardTitle component, usually an `h3` for sectioning within the card
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

// CardDescription component, provides a smaller text style for descriptions
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

// CardContent component, the main content section of the card with padding
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(`${baseFontClass} p-6 pt-0 transition-colors duration-300`, className)}
        {...props}
    />
));
CardContent.displayName = "CardContent";

// CardFooter component, styled for bottom placement in the card, often with action buttons or links
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

// Exporting components with ThemeProvider wrapper for consistent theme access
const Card = React.forwardRef((props, ref) => (
    <ThemeProvider>
        <ProjectCard ref={ref} {...props} />
    </ThemeProvider>
));

export {
    Card,             // Card wrapped with ThemeProvider
    ProjectCard,      // Also export as ProjectCard
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
