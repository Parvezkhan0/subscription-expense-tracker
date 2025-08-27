import React, { useState, useEffect } from "react";
import api from "../services/api";
import AddSubscriptionForm from "../components/subscriptions/AddSubscriptionForm";
import SubscriptionList from "../components/subscriptions/SubscriptionList";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await api.get("/subscriptions/");
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubscription = async (formData) => {
    if (!formData) {
      setShowAddModal(false);
      return;
    }

    setSubmitStatus({ type: 'loading', message: 'Adding subscription...' });
    
    try {
      await api.post("/subscriptions/", formData);
      setSubmitStatus({ type: 'success', message: 'Subscription added successfully!' });
      setShowAddModal(false);
      fetchSubscriptions(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Error adding subscription:", error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.detail || 'Failed to add subscription. Please try again.' 
      });
    }
  };

  const handleAddSubscriptionClick = () => {
    setShowAddModal(true);
    setSubmitStatus(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Subscriptions</h1>
            <p className="text-gray-600">Manage your active subscriptions and billing cycles.</p>
          </div>
          <button 
            onClick={handleAddSubscriptionClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Subscription</span>
          </button>
        </div>
        
        {subscriptions.length > 0 ? (
          <SubscriptionList subscriptions={subscriptions} onUpdate={fetchSubscriptions} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No subscriptions yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your subscriptions by adding your first one.</p>
            <button 
              onClick={handleAddSubscriptionClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Your First Subscription
            </button>
          </div>
        )}

        {/* Submit Status Message */}
        {submitStatus && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            submitStatus.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' :
            submitStatus.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' :
            'bg-blue-100 border border-blue-400 text-blue-700'
          }`}>
            <div className="flex items-center space-x-2">
              {submitStatus.type === 'loading' && (
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {submitStatus.type === 'success' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {submitStatus.type === 'error' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{submitStatus.message}</span>
            </div>
          </div>
        )}

        {/* Test Button - Outside Modal */}
        <div className="fixed top-4 left-4 z-40">
          <button 
            onClick={() => {
              console.log("Testing form submission from outside modal");
              const form = document.getElementById('subscription-form');
              if (form) {
                console.log("Form found, testing submit...");
                form.dispatchEvent(new Event('submit', { bubbles: true }));
              } else {
                console.log("Form not found in DOM");
              }
            }}
            className="bg-green-500 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-600"
          >
            🧪 Test Submit
          </button>
        </div>

        {/* Add Subscription Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-xl font-semibold text-gray-900">Add New Subscription</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Form Content - Scrollable */}
              <div className="p-6 overflow-y-auto flex-1">
                <AddSubscriptionForm 
                  onSubmit={handleAddSubscription}
                />
              </div>
              
              {/* SUBMIT BUTTONS - ALWAYS VISIBLE AT BOTTOM */}
              <div className="p-6 border-t border-gray-200 bg-blue-50 flex-shrink-0">
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => {
                      console.log("SUBMIT BUTTON CLICKED!");
                      const form = document.getElementById('subscription-form');
                      if (form) {
                        console.log("Form found, submitting...");
                        form.dispatchEvent(new Event('submit', { bubbles: true }));
                      } else {
                        console.log("Form not found!");
                      }
                    }}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors"
                    style={{ backgroundColor: '#2563eb', color: 'white' }}
                  >
                    Add Subscription
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                <div className="text-center text-sm text-blue-600 mt-2">
                  Submit button is always visible at the bottom!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
