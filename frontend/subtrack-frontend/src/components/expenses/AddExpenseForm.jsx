import React, { useState } from 'react';

const AddExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ 
    title: '', 
    amount: '', 
    category: '', 
    date: '',
    description: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Convert amount to number
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      await onSubmit(submitData);
      setFormData({ title: '', amount: '', category: '', date: '', description: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onSubmit(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Expense Title</label>
        <input 
          name="title" 
          placeholder="e.g., Grocery shopping, Gas" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" 
          value={formData.title} 
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
            className="w-full border border-gray-300 p-3 pl-8 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" 
            value={formData.amount} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select 
          name="category" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" 
          value={formData.category} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
        <input 
          name="date" 
          type="date" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" 
          value={formData.date} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea 
          name="description" 
          placeholder="Optional description" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors" 
          value={formData.description} 
          onChange={handleChange} 
          rows="3"
        />
      </div>
      
      <div className="flex gap-3 pt-4">
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
        <button 
          type="button" 
          onClick={handleCancel}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm; 