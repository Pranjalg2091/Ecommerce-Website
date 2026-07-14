import React from "react";

const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse duration-2000 rounded-md bg-neutral-200 ${className}`} />
  );
};

export default Skeleton;
