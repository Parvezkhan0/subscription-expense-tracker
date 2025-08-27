// src/components/ui/Toast.jsx
import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-700";

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 text-white rounded shadow-lg z-50 ${bgColor}`}
    >
      {message}
    </div>
  );
};

export default Toast;
