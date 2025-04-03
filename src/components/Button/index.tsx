import React from "react";
import clsx from "clsx";

type ButtonVariant = "purple" | "green" | "black";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  purple: "bg-purpleOne text-white",
  green: "bg-greenOne text-black",
  black: "bg-blackOne text-white",
};

export function Button({
  variant = "purple",
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "p-4 rounded font-semibold cursor-pointer w-full hover:opacity-80 transition-opacity duration-200 ease-in-out",
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
