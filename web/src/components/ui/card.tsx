import * as React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`rounded-3xl border border-border bg-background p-6 shadow-md transition-all transform-gpu ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
