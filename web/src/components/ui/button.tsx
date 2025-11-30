import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  asChild,
  className = "",
  children,
  ...props
}) => {
  const Comp: any = asChild ? "span" : "button";

  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors";
  const variants =
    variant === "outline"
      ? "border border-primary text-primary bg-transparent hover:bg-primary/10"
      : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <Comp className={`${base} ${variants} ${className}`} {...props}>
      {children}
    </Comp>
  );
};
