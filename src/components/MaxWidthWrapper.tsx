import { ReactNode } from "react";

export const MaxWidthWrapper = ({
  maxWidth,
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={`mx-auto h-full w-full ${className || ""}`}
      style={{ maxWidth: `${maxWidth}` }}
    >
      {children}
    </div>
  );
};

interface MaxWidthWrapperProps {
  maxWidth: string;
  className?: string;
  children: ReactNode;
}
