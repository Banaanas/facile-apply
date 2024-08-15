import React from "react";

const Main = ({ className, children }: MainProps) => {
  return (
    <main
      className={`flex w-full grow flex-col items-center justify-start px-8 ${
        className || ""
      }`}
    >
      {children}
    </main>
  );
};

export default Main;

interface MainProps {
  className?: string;
  children: React.ReactNode;
}
