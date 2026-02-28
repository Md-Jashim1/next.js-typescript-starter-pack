import React, { ReactNode } from "react";

const MyContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className="max-w-300 w-[90%] mx-auto">{children}</div>;
};

export default MyContainer;
