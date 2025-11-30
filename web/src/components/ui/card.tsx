import * as React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`rounded-xl border bg-background/60 p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
