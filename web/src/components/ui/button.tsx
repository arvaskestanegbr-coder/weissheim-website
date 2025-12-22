import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  asChild,
  className = "",
  children,
  ...props
}) => {
  const Comp: any = asChild ? "span" : "button";

  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  const variants =
    variant === "outline"
      ? "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
      : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]";

  const sizes =
    size === "sm"
      ? "h-9 px-3 text-sm"
      : size === "lg"
      ? "h-12 px-8 text-base"
      : "h-10 px-4 text-sm";

  return (
    <Comp
      className={`${base} ${variants} ${sizes} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
};
