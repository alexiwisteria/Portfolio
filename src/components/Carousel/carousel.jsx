"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button/Button";

// Create a context for the carousel to manage its state globally
const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

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

// Carousel component
const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

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

    useEffect(() => {
      if (api && setApi) setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
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
          className={cn("relative max-w-[75%] mx-auto", className)} // Reduced max width for carousel
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

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div
      ref={carouselRef}
      className={cn("overflow-hidden", className)} // Adds overflow-hidden to prevent spillover
      style={{
        width: "425px",   // Set width to match the slide width
        height: "200px",  // Reduced height
        borderRadius: "16px", // Set border radius if not using Tailwind
      }}
    >
      <div
        ref={ref}
        className={cn(
          "flex flex-nowrap", // Add flex-nowrap to prevent wrapping
          orientation === "horizontal" ? "" : "-mt-2 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, repoLink, ...props }, ref) => {
  const { orientation } = useCarousel();
  const isDarkTheme = useDarkTheme();

  return (
    <button
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-[425px] max-w-[425px] h-[200px] shrink-0 grow-0 basis-full transform focus:outline-none transition-transform",
        "bg-lightBackground text-lightText border-lightBorder dark:bg-darkBackground dark:text-darkText",
        orientation === "horizontal" ? "pl-2" : "pt-2",
        isDarkTheme ? "dark:hover:bg-lightAccent" : "hover:bg-darkText",
        className
      )}
      onClick={() => window.open(repoLink, "_blank")}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// CarouselPrevious button with updated width and centering adjustments
const CarouselPrevious = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    const isDarkTheme = useDarkTheme();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-10 w-10 p-2 rounded-full transition-transform transform hover:scale-110", // Increased height, width, and padding for larger buttons
          "bg-lightBackground text-lightAccent border-lightBorder dark:bg-darkBackground dark:text-darkAccent dark:border-darkBorder",
          orientation === "horizontal"
            ? "-left-8 top-1/2 -translate-y-1/2" // Adjusted left positioning for centering
            : "-top-8 left-1/2 -translate-x-1/2 rotate-90",
          isDarkTheme ? "dark:hover:bg-lightAccent" : "hover:bg-darkText", // Conditional hover styles
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-5 w-5" /> {/* Increased arrow icon size */}
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

// CarouselNext button with updated width and centering adjustments
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    const isDarkTheme = useDarkTheme();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-10 w-10 p-2 rounded-full transition-transform transform hover:scale-110", // Increased height, width, and padding for larger buttons
          "bg-lightBackground text-lightAccent border-lightBorder dark:bg-darkBackground dark:text-darkAccent dark:border-darkBorder",
          orientation === "horizontal"
            ? "-right-8 top-1/2 -translate-y-1/2" // Adjusted right positioning for centering
            : "-bottom-8 left-1/2 -translate-x-1/2 rotate-90",
          isDarkTheme ? "dark:hover:bg-lightAccent" : "hover:bg-darkText", // Conditional hover styles
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-5 w-5" /> {/* Increased arrow icon size */}
        <span className="sr-only">Next slide</span>
      </Button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
