import React, { useState, useEffect } from 'react';
import { healthCheck } from '../services/api';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const result = await healthCheck();
        if (result) {
          setStatus('connected');
        } else {
          setStatus('disconnected');
          setError('Backend is not responding');
        }
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    };

    checkBackend();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-100';
      case 'disconnected':
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return '✅ Backend Connected';
      case 'disconnected':
        return '❌ Backend Disconnected';
      case 'error':
        return '⚠️ Backend Error';
      default:
        return '⏳ Checking Backend...';
    }
  };

  return (
    <div className={`fixed top-4 right-4 p-3 rounded-lg border ${getStatusColor()}`}>
      <div className="text-sm font-medium">{getStatusText()}</div>
      {error && <div className="text-xs mt-1">{error}</div>}
    </div>
  );
};

export default BackendStatus; 