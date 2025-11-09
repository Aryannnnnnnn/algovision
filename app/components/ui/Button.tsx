import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
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
  const baseStyles = "font-semibold rounded-xl transition-all duration-500 ease-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "group relative bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/25 hover:shadow-xl hover:shadow-orange-600/40 hover:scale-[1.02] overflow-hidden",
    secondary: "group bg-white border-2 border-gray-200 text-gray-900 hover:border-orange-600 hover:text-orange-600 shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      )}
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative group-hover:translate-x-1 transition-transform duration-500 ease-out">
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
