import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Carousel styling variants using class-variance-authority.
 */
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

/**
 * Main Carousel component.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.variant="default"] - Visual variant of the carousel.
 * @param {string} [props.size="default"] - Size variant of the carousel.
 * @param {React.ReactNode} props.children - Content items to be displayed in the carousel.
 * @param {number} props.activeIndex - Index of the currently active item.
 * @param {Function} props.handleNext - Callback to handle the "next" button click.
 * @param {Function} props.handlePrevious - Callback to handle the "previous" button click.
 * @param {React.Ref} ref - Ref forwarded to the carousel element.
 * @returns {JSX.Element} The rendered Carousel component.
 */
const Carousel = React.forwardRef(
  ({ className, variant = "default", size = "default", children, activeIndex, handleNext, handlePrevious, ...props }, ref) => (
    <div className={cn(carouselVariants({ variant, size, className }))} ref={ref} {...props}>
      <CarouselContent activeIndex={activeIndex}>{children}</CarouselContent>
      <CarouselPrevious onClick={handlePrevious} />
      <CarouselNext onClick={handleNext} />
    </div>
  )
);

Carousel.displayName = "Carousel";

/**
 * CarouselContent component to wrap and transition between carousel items.
 *
 * @param {Object} props - Component props.
 * @param {number} props.activeIndex - Index of the active carousel item.
 * @param {React.ReactNode} props.children - Carousel items to display.
 * @returns {JSX.Element} The CarouselContent component.
 */
const CarouselContent = ({ className, children, activeIndex, ...props }) => (
  <div
    className={cn("flex", className)}
    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
    {...props}
  >
    {React.Children.map(children, (child) => (
      <div className="flex-shrink-0 w-full">{child}</div>
    ))}
  </div>
);

/**
 * CarouselItem component - Each individual item within the carousel.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content to display within the carousel item.
 * @param {React.Ref} ref - Ref forwarded to the carousel item element.
 * @returns {JSX.Element} The CarouselItem component.
 */
const CarouselItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className={cn("transition-transform", className)} ref={ref} {...props}>
    {children}
  </div>
));

CarouselItem.displayName = "CarouselItem";

/**
 * CarouselPrevious button to navigate to the previous carousel item.
 *
 * @param {Object} props - Component props.
 * @param {React.Ref} ref - Ref forwarded to the previous button.
 * @returns {JSX.Element} The CarouselPrevious button.
 */
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

/**
 * CarouselNext button to navigate to the next carousel item.
 *
 * @param {Object} props - Component props.
 * @param {React.Ref} ref - Ref forwarded to the next button.
 * @returns {JSX.Element} The CarouselNext button.
 */
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
