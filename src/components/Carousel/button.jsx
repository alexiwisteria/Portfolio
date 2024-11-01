import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Variants and sizes for the Button component.
 * Configured using class-variance-authority to manage style variations.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-darkBorder dark:focus-visible:ring-lightBorder disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-darkBackground text-darkText shadow hover:bg-darkAccent dark:bg-lightAccent dark:text-darkText dark:hover:bg-lightAccent",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-600/90 dark:bg-red-400 dark:text-white dark:hover:bg-red-400/90",
        outline:
          "border border-darkBorder bg-lightBackground text-lightText shadow-sm hover:bg-lightAccent dark:border-lightBorder dark:bg-darkBackground dark:text-darkText dark:hover:bg-darkAccent",
        secondary:
          "bg-lightAccent text-lightText shadow-sm hover:bg-lightAccent/90 dark:bg-darkAccent dark:text-darkText dark:hover:bg-darkAccent/90",
        ghost:
          "hover:bg-lightAccent/10 text-lightText dark:hover:bg-darkAccent/10",
        link: "text-lightAccent underline-offset-4 hover:underline dark:text-darkAccent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Button component - Renders a styled button with customizable variants and sizes.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.variant="default"] - Style variant of the button.
 * @param {string} [props.size="default"] - Size variant of the button.
 * @param {boolean} [props.asChild=false] - If true, renders as a Slot component for wrapper support.
 * @param {string} [props.className] - Additional CSS classes for custom styling.
 * @param {React.Ref} ref - Ref forwarded to the button element.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    // Conditional component, renders as Slot if asChild is true, else as button
    const Component = asChild ? Slot : "button";

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
