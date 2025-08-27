import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const TestButtons = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();
  const [testResults, setTestResults] = useState({});

  const testLogin = async () => {
    try {
      console.log("Testing login with test@example.com / password123");
      const result = await login('test@example.com', 'password123');
      setTestResults(prev => ({ ...prev, login: result.success ? 'Success' : 'Failed: ' + result.error }));
    } catch (error) {
      console.error("Test login error:", error);
      setTestResults(prev => ({ ...prev, login: 'Error: ' + error.message }));
    }
  };

  const testRegister = async () => {
    try {
      const result = await login('newuser@example.com', 'password123', 'New User');
      setTestResults(prev => ({ ...prev, register: result.success ? 'Success' : 'Failed' }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, register: 'Error: ' + error.message }));
    }
  };

  const testDashboard = async () => {
    try {
      const response = await api.get('/dashboard/summary');
      setTestResults(prev => ({ ...prev, dashboard: 'Success: ' + JSON.stringify(response.data) }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, dashboard: 'Error: ' + error.message }));
    }
  };

  const testSubscriptions = async () => {
    try {
      const response = await api.get('/subscriptions/');
      setTestResults(prev => ({ ...prev, subscriptions: 'Success: ' + response.data.length + ' subscriptions' }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, subscriptions: 'Error: ' + error.message }));
    }
  };

  const testExpenses = async () => {
    try {
      const response = await api.get('/expenses/');
      setTestResults(prev => ({ ...prev, expenses: 'Success: ' + response.data.length + ' expenses' }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, expenses: 'Error: ' + error.message }));
    }
  };

  const testNotifications = async () => {
    try {
      const response = await api.get('/notifications/');
      setTestResults(prev => ({ ...prev, notifications: 'Success: ' + response.data.length + ' notifications' }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, notifications: 'Error: ' + error.message }));
    }
  };

  const testFormSubmission = () => {
    try {
      console.log("Testing form submission...");
      const form = document.getElementById('subscription-form');
      if (form) {
        console.log("Form found, testing submit...");
        form.dispatchEvent(new Event('submit', { bubbles: true }));
        setTestResults(prev => ({ ...prev, formTest: 'Form submit event triggered' }));
      } else {
        console.log("Form not found!");
        setTestResults(prev => ({ ...prev, formTest: 'Form not found in DOM' }));
      }
    } catch (error) {
      setTestResults(prev => ({ ...prev, formTest: 'Error: ' + error.message }));
    }
  };

  const testBackendConnection = async () => {
    try {
      const response = await api.get('/health');
      setTestResults(prev => ({ ...prev, backend: 'Success: ' + JSON.stringify(response.data) }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, backend: 'Error: ' + error.message }));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm z-50">
      <h3 className="text-sm font-semibold mb-2">Debug Panel</h3>

      <div className="space-y-2 text-xs">
        <div>
          <strong>User:</strong> {user ? user.email : 'Not logged in'}
        </div>

        <div className="space-y-1">
          <button
            onClick={testBackendConnection}
            className="w-full bg-gray-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Backend Connection
          </button>
          <button
            onClick={testLogin}
            className="w-full bg-blue-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Login
          </button>
          <button
            onClick={testRegister}
            className="w-full bg-green-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Register
          </button>
          <button
            onClick={testDashboard}
            className="w-full bg-purple-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Dashboard API
          </button>
          <button
            onClick={testSubscriptions}
            className="w-full bg-orange-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Subscriptions API
          </button>
          <button
            onClick={testExpenses}
            className="w-full bg-red-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Expenses API
          </button>
          <button
            onClick={testNotifications}
            className="w-full bg-pink-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Notifications API
          </button>
          <button
            onClick={testFormSubmission}
            className="w-full bg-yellow-500 text-white px-2 py-1 rounded text-xs"
          >
            Test Form Submission
          </button>
        </div>

        <div className="mt-2 space-y-1">
          {Object.entries(testResults).map(([key, value]) => (
            <div key={key} className="text-xs">
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>

        <div className="mt-2 space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-500 text-white px-2 py-1 rounded text-xs"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/subscriptions')}
            className="w-full bg-gray-500 text-white px-2 py-1 rounded text-xs"
          >
            Go to Subscriptions
          </button>
          <button
            onClick={() => navigate('/expenses')}
            className="w-full bg-gray-500 text-white px-2 py-1 rounded text-xs"
          >
            Go to Expenses
          </button>
          <button
            onClick={() => navigate('/notifications')}
            className="w-full bg-gray-500 text-white px-2 py-1 rounded text-xs"
          >
            Go to Notifications
          </button>
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white px-2 py-1 rounded text-xs"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestButtons; 