// src/components/dashboard/SubscriptionCard.jsx
import React from 'react';

const SubscriptionCard = ({ name, price, nextBilling }) => (
  <div className="p-4 bg-white rounded-xl shadow flex flex-col gap-1">
    <h3 className="text-lg font-medium">{name}</h3>
    <p className="text-gray-500">₹{price}/month</p>
    <p className="text-sm text-green-600">Next billing: {nextBilling}</p>
  </div>
);

export default SubscriptionCard;
