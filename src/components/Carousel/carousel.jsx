// Carousel Component (carousel.jsx)

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const carouselVariants = cva(
  "relative flex overflow-hidden rounded-md transition-all",
  {
    variants: {
      variant: {
        default: "bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText",
        bordered: "border border-lightBorder bg-lightBackground text-lightText dark:border-darkBorder dark:bg-darkBackground dark:text-darkText",
        shadowed: "shadow-lg bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText",
      },
      size: {
        default: "w-full max-w-lg",
        small: "w-72",
        large: "w-full max-w-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Carousel = React.forwardRef(
  ({ className, variant, size, children, activeIndex, handleNext, handlePrevious, ...props }, ref) => {
    return (
      <div className={cn(carouselVariants({ variant, size, className }))} ref={ref} {...props}>
        <CarouselContent activeIndex={activeIndex}>{children}</CarouselContent>
        <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} />
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

const CarouselContent = ({ className, children, activeIndex, ...props }) => (
  <div
    className={cn("flex transition-transform duration-300", className)}
    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
    {...props}
  >
    {React.Children.map(children, (child) => (
      <div className="flex-shrink-0 w-full">{child}</div>
    ))}
  </div>
);

const CarouselItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className={cn("transition-transform", className)} ref={ref} {...props}>
    {children}
  </div>
));

CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={cn("absolute left-0 z-10 p-2 bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText hover:bg-lightAccent dark:hover:bg-darkAccent transition-colors rounded-full", className)}
    ref={ref}
    {...props}
  >
    &#10094;
  </button>
));

CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={cn("absolute right-0 z-10 p-2 bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText hover:bg-lightAccent dark:hover:bg-darkAccent transition-colors rounded-full", className)}
    ref={ref}
    {...props}
  >
    &#10095;
  </button>
));

CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
