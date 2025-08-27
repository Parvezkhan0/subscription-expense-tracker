// src/components/ui/Card.jsx
import React from "react";
import { cn } from "../../lib/utils";

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow p-4 md:p-6 border border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
