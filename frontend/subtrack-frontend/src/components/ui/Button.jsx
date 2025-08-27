import React from "react";

const Button = ({ children, onClick, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
