import { FC, ReactNode } from "react";

export const GradientHeading: FC<{ children?: ReactNode }> = ({ children }) => (
  <h1 className="mb-5 block bg-gradient-to-tr from-red-600 to-indigo-700 bg-clip-text text-[5vw] font-extrabold text-transparent">
    {children}
  </h1>
);
