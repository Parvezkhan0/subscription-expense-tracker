// src/components/subscriptions/AddSubscriptionForm.jsx
import React, { useState } from 'react';

const AddSubscriptionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    amount: '', 
    frequency: '', 
    next_payment_date: '',
    description: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setLoading(true);
    
    try {
      // Convert amount to number
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      console.log('Submitting data:', submitData);
      await onSubmit(submitData);
      setFormData({ 
        name: '', 
        amount: '', 
        frequency: '', 
        next_payment_date: '',
        description: '',
        status: 'active'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="subscription-form" onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Name</label>
        <input 
          name="name" 
          placeholder="e.g., Netflix, Spotify" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500">$</span>
          <input 
            name="amount" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            className="w-full border border-gray-300 p-3 pl-8 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
            value={formData.amount} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Billing Frequency</label>
        <select 
          name="frequency" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
          value={formData.frequency} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Frequency</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Weekly">Weekly</option>
          <option value="Daily">Daily</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Next Payment Date</label>
        <input 
          name="next_payment_date" 
          type="date" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
          value={formData.next_payment_date} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select 
          name="status" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
          value={formData.status} 
          onChange={handleChange} 
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea 
          name="description" 
          placeholder="Optional description" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
          value={formData.description} 
          onChange={handleChange} 
          rows="3"
        />
      </div>
      
      {/* Debug info */}
      <div className="p-3 bg-gray-100 rounded text-xs">
        <p><strong>Debug:</strong> Form data: {JSON.stringify(formData)}</p>
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>Form ID:</strong> subscription-form</p>
      </div>
    </form>
  );
};

export default AddSubscriptionForm;
