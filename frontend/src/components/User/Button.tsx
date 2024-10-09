import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const buttonStyles = {
  default: "bg-blue-500 text-white hover:bg-blue-600",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
  secondary: "bg-green-500 text-white hover:bg-green-600",
  ghost: "bg-transparent text-blue-500 hover:bg-blue-100",
  link: "text-blue-500 underline hover:text-blue-600",
};

const sizeStyles = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className,
  ...props
}) => {
  const variantClasses = buttonStyles[variant];
  const sizeClasses = sizeStyles[size];

  return (
    <button
      className={`${variantClasses} ${sizeClasses} inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    />
  );
};

export default Button;
