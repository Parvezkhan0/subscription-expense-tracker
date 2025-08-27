// src/components/subscriptions/EditSubscriptionModal.jsx
import React, { useState, useEffect } from 'react';

const EditSubscriptionModal = ({ isOpen, subData, onSave, onClose }) => {
  const [formData, setFormData] = useState(subData);

  useEffect(() => {
    setFormData(subData);
  }, [subData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-3 w-96">
        <h2 className="text-lg font-bold">Edit Subscription</h2>
        <input name="name" placeholder="Name" className="w-full border p-2 rounded" value={formData.name} onChange={handleChange} />
        <input name="amount" type="number" placeholder="Amount" className="w-full border p-2 rounded" value={formData.amount} onChange={handleChange} />
        <select name="frequency" className="w-full border p-2 rounded" value={formData.frequency} onChange={handleChange}>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <input name="nextPayment" type="date" className="w-full border p-2 rounded" value={formData.nextPayment} onChange={handleChange} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditSubscriptionModal;
