// src/components/dashboard/ExpenseOverview.jsx
import React from 'react';

const ExpenseOverview = ({ total, month }) => (
  <div className="bg-white shadow p-4 rounded-xl w-full">
    <h2 className="text-lg font-semibold mb-2">Monthly Overview</h2>
    <p className="text-gray-500">Total Expenses for {month}:</p>
    <h3 className="text-2xl font-bold mt-1">₹{total}</h3>
  </div>
);

export default ExpenseOverview;
