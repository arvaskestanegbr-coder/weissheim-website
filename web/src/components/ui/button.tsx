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
  const base =
    "inline-flex items-center justify-center rounded-2xl font-medium transition-all transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  const variants =
    variant === "outline"
      ? "border border-primary/70 text-foreground bg-white hover:bg-muted/30 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0";

  const sizes =
    size === "sm"
      ? "h-10 px-4 text-sm"
      : size === "lg"
      ? "h-14 px-8 text-base"
      : "h-11 px-6 text-sm";

  const composedClassName = `${base} ${variants} ${sizes} ${className}`.trim();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    const childClassName = child.props.className ?? "";

    return React.cloneElement(child, {
      ...props,
      className: `${composedClassName} ${childClassName}`.trim(),
    });
  }

  if (asChild) {
    return <span className={composedClassName}>{children}</span>;
  }

  return (
    <button className={composedClassName} {...props}>
      {children}
    </button>
  );
};
