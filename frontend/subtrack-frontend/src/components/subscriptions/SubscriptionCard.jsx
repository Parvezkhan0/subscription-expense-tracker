// src/components/subscriptions/SubscriptionCard.jsx
import React from 'react';

const SubscriptionCard = ({ sub, onEdit, onDelete }) => (
  <div className="p-4 border bg-white rounded-xl shadow-sm space-y-2">
    <h3 className="text-lg font-semibold">{sub.name}</h3>
    <p className="text-sm text-gray-500">₹{sub.amount} / {sub.frequency}</p>
    <p className="text-sm">Next Payment: {sub.nextPayment}</p>
    <div className="flex justify-end gap-2">
      <button className="text-blue-600" onClick={() => onEdit(sub)}>Edit</button>
      <button className="text-red-600" onClick={() => onDelete(sub.id)}>Delete</button>
    </div>
  </div>
);

export default SubscriptionCard;
