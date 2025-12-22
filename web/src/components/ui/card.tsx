import * as React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`rounded-[28px] border border-transparent bg-background p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all transform-gpu ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
