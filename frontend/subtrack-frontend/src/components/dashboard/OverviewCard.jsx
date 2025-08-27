import React from "react";

const OverviewCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 shadow rounded-2xl flex items-center justify-between w-full sm:w-[48%]">
      <div>
        <h4 className="text-sm text-gray-600">{title}</h4>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="text-indigo-600 text-3xl">{icon}</div>
    </div>
  );
};

export default OverviewCard;
