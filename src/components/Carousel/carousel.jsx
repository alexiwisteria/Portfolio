"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button/Button";

// Create a global context for managing carousel state
const CarouselContext = React.createContext(null);

/**
 * Custom hook to access the Carousel context.
 * Throws an error if used outside of a Carousel component.
 * @returns {Object} Carousel context including ref and control functions
 */
function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

/**
 * Custom hook to detect and manage the dark theme preference.
 * @returns {boolean} True if the system prefers a dark theme, otherwise false.
 */
const useDarkTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkTheme(darkModeMediaQuery.matches);

    const handleThemeChange = (e) => setIsDarkTheme(e.matches);
    darkModeMediaQuery.addEventListener("change", handleThemeChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return isDarkTheme;
};

/**
 * Carousel component wrapping content in a horizontal or vertical scrollable carousel.
 * @param {Object} props - Carousel properties
 * @param {"horizontal" | "vertical"} [props.orientation="horizontal"] - Scroll orientation
 * @param {Array} props.plugins - Plugins to enhance carousel functionality
 * @param {Object} props.opts - Embla options for carousel configuration
 * @param {Function} props.setApi - Callback to expose the carousel API
 * @param {JSX.Element[]} props.children - Carousel items
 */
const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    // Update scroll button states based on carousel position
    const onSelect = useCallback((api) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    // Carousel navigation functions
    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    // Initialize API and subscribe to carousel events
    useEffect(() => {
      if (api && setApi) setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => api.off("select", onSelect);
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative max-w-[75%] mx-auto", className)}
          role="region"
          aria-roledescription="carousel"
          aria-live="polite"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

/**
 * CarouselContent - Container for the items within the carousel.
 * @param {Object} props - Component properties
 * @returns {JSX.Element} Wrapper for carousel items with scroll styling
 */
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div
      ref={carouselRef}
      className={cn("overflow-hidden", className)}
      style={{
        width: "425px",
        height: "200px",
        borderRadius: "16px",
      }}
    >
      <div
        ref={ref}
        className={cn(
          "flex flex-nowrap",
          orientation === "horizontal" ? "" : "-mt-2 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

/**
 * CarouselItem - Single item component within the carousel.
 * Opens a provided link when clicked.
 * @param {string} repoLink - URL to open on click
 * @param {Object} props - Additional properties
 */
const CarouselItem = React.forwardRef(({ className, repoLink, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <button
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-[425px] max-w-[425px] h-[200px] shrink-0 grow-0 basis-full transform focus:outline-none transition-transform",
        "bg-lightBackground text-lightText border-lightBorder dark:bg-darkBackground dark:text-darkText",
        orientation === "horizontal" ? "pl-2" : "pt-2",
        "hover:bg-darkText dark:hover:bg-lightAccent",
        className
      )}
      onClick={() => window.open(repoLink, "_blank")}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

/**
 * CarouselPrevious - Button to scroll to the previous item in the carousel.
 * @param {Object} props - Component properties
 * @returns {JSX.Element} Previous button with accessibility and hover effects
 */
const CarouselPrevious = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-10 w-10 p-2 rounded-full transition-transform transform hover:scale-110",
          "bg-lightBackground text-lightAccent border-lightBorder dark:bg-darkBackground dark:text-darkAccent dark:border-darkBorder",
          orientation === "horizontal"
            ? "-left-8 top-1/2 -translate-y-1/2"
            : "-top-8 left-1/2 -translate-x-1/2 rotate-90",
          "hover:bg-darkText dark:hover:bg-lightAccent",
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

/**
 * CarouselNext - Button to scroll to the next item in the carousel.
 * @param {Object} props - Component properties
 * @returns {JSX.Element} Next button with accessibility and hover effects
 */
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-10 w-10 p-2 rounded-full transition-transform transform hover:scale-110",
          "bg-lightBackground text-lightAccent border-lightBorder dark:bg-darkBackground dark:text-darkAccent dark:border-darkBorder",
          orientation === "horizontal"
            ? "-right-8 top-1/2 -translate-y-1/2"
            : "-bottom-8 left-1/2 -translate-x-1/2 rotate-90",
          "hover:bg-darkText dark:hover:bg-lightAccent",
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-5 w-5" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
