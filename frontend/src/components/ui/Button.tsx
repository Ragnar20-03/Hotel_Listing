import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Define base classes
    let baseClasses =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // Variant classes
    let variantClasses = "";
    switch (variant) {
      case "destructive":
        variantClasses = "bg-red-600 text-white hover:bg-red-500";
        break;
      case "outline":
        variantClasses = "border border-gray-300 bg-white hover:bg-gray-100";
        break;
      case "secondary":
        variantClasses = "bg-gray-600 text-white hover:bg-gray-500";
        break;
      case "ghost":
        variantClasses = "hover:bg-gray-100";
        break;
      case "link":
        variantClasses = "text-blue-600 underline hover:text-blue-500";
        break;
      default:
        variantClasses = "bg-blue-600 text-white hover:bg-blue-500"; // default case
    }

    // Size classes
    let sizeClasses = "";
    switch (size) {
      case "sm":
        sizeClasses = "h-9 px-3 rounded-md";
        break;
      case "lg":
        sizeClasses = "h-11 px-8 rounded-md";
        break;
      case "icon":
        sizeClasses = "h-10 w-10";
        break;
      default:
        sizeClasses = "h-10 px-4 py-2"; // default case
    }

    // Combine all classes
    const finalClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

    return <Comp className={finalClasses} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
