import React from "react";

const Input = ({ label, type = "text", name, value, onChange, className = "", ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label htmlFor={name} className="mb-1 font-medium text-sm">{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
