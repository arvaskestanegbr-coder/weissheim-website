import { useRef, type ElementType, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  "data-analytics-id"?: string;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  className = "",
  as: Tag = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref}
      className={`${className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#78684F]`}
      {...props}
    >
      {children}
    </Component>
  );
}
