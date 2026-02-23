import { useRef, type ReactNode } from "react";

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

  return (
    // @ts-expect-error dynamic tag typing
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
