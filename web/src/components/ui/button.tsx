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
    "inline-flex items-center justify-center font-medium tracking-wide uppercase text-[0.8em] transition-all duration-300 transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-full";

  const variants =
    variant === "outline"
      ? "border border-foreground/20 text-foreground bg-transparent hover:bg-foreground hover:text-background hover:shadow-[0_8px_30px_rgba(26,26,26,0.12)] hover:-translate-y-0.5 active:translate-y-0"
      : "bg-foreground text-background hover:bg-warm-800 hover:shadow-[0_8px_30px_rgba(26,26,26,0.18)] hover:-translate-y-0.5 active:translate-y-0";

  const sizes =
    size === "sm"
      ? "h-10 px-5 text-[0.7em]"
      : size === "lg"
      ? "h-14 px-10 text-[0.8em]"
      : "h-11 px-7 text-[0.75em]";

  return (
    <Comp
      className={`${base} ${variants} ${sizes} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
};
