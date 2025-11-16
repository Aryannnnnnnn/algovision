import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "font-semibold transition-all duration-500 ease-out flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-lg";

  const variants = {
    primary: "group relative bg-[#00011f] text-white overflow-hidden",
    secondary: "group relative bg-white border-2 border-gray-900 text-gray-900 hover:border-[#00011f] hover:text-white overflow-hidden",
    accent: "group relative bg-[#00b5ff] text-white overflow-hidden rounded-lg",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {variant === "secondary" && (
        <div className="absolute inset-0 bg-[#00011f] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
      )}
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 ease-out">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {content}
    </button>
  );
}
