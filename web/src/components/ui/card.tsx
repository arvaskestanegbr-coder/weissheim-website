import * as React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border border-border/60 bg-background p-6 shadow-[0_4px_20px_rgba(26,26,26,0.03)] transition-all duration-300 transform-gpu ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
