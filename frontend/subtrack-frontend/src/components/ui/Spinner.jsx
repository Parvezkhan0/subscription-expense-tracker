// src/components/ui/Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
