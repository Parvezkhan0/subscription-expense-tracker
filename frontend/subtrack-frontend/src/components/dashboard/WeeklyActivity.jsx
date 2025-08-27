// src/components/dashboard/WeeklyActivity.jsx
import React from 'react';

const WeeklyActivity = ({ activities }) => (
  <div className="bg-white shadow p-4 rounded-xl">
    <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
    <ul className="text-sm text-gray-600 space-y-1">
      {activities.map((act, index) => (
        <li key={index}>• {act}</li>
      ))}
    </ul>
  </div>
);

export default WeeklyActivity;
