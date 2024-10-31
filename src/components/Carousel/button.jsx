import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-darkBorder dark:focus-visible:ring-lightBorder disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-darkBackground text-darkText shadow hover:bg-darkAccent dark:bg-lightAccent dark:text-darkText dark:hover:bg-lightAccent",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-600/90 dark:bg-red-400 dark:text-white dark:hover:bg-red-400/90",
        outline: "border border-darkBorder bg-lightBackground text-lightText shadow-sm hover:bg-lightAccent dark:border-lightBorder dark:bg-darkBackground dark:text-darkText dark:hover:bg-darkAccent",
        secondary: "bg-lightAccent text-lightText shadow-sm hover:bg-lightAccent/90 dark:bg-darkAccent dark:text-darkText dark:hover:bg-darkAccent/90",
        ghost: "hover:bg-lightAccent/10 text-lightText dark:hover:bg-darkAccent/10",
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

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
