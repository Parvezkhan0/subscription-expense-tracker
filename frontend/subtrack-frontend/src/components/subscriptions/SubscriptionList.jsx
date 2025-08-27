// src/components/subscriptions/SubscriptionList.jsx
import React from 'react';

const SubscriptionList = ({ subscriptions, onUpdate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const getFrequencyColor = (frequency) => {
    const colors = {
      'Monthly': 'bg-blue-100 text-blue-800',
      'Yearly': 'bg-green-100 text-green-800',
      'Weekly': 'bg-purple-100 text-purple-800',
      'Daily': 'bg-orange-100 text-orange-800'
    };
    return colors[frequency] || colors['Monthly'];
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || colors['active'];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Subscriptions</h2>
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {subscription.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{subscription.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(subscription.frequency)}`}>
                      {subscription.frequency}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Next payment: {formatDate(subscription.next_payment_date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{formatAmount(subscription.amount)}</p>
                <p className="text-xs text-gray-500">{subscription.frequency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionList;
