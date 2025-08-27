import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const DebugAuth = () => {
  const { user, login, register } = useContext(AuthContext);
  const [testResult, setTestResult] = useState('');

  const testLogin = async () => {
    try {
      const result = await login('test2@example.com', 'password123');
      setTestResult(`Login result: ${JSON.stringify(result)}`);
    } catch (error) {
      setTestResult(`Login error: ${error.message}`);
    }
  };

  const testRegister = async () => {
    try {
      const result = await register('test3@example.com', 'password123', 'Test User 3');
      setTestResult(`Register result: ${JSON.stringify(result)}`);
    } catch (error) {
      setTestResult(`Register error: ${error.message}`);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-md">
      <h3 className="font-bold mb-2">Debug Auth</h3>
      <div className="text-sm mb-2">
        <strong>Current User:</strong> {user ? JSON.stringify(user) : 'None'}
      </div>
      <div className="space-y-2">
        <button 
          onClick={testLogin}
          className="btn btn-primary text-xs px-2 py-1"
        >
          Test Login
        </button>
        <button 
          onClick={testRegister}
          className="btn btn-secondary text-xs px-2 py-1 ml-2"
        >
          Test Register
        </button>
      </div>
      {testResult && (
        <div className="mt-2 text-xs bg-gray-100 p-2 rounded">
          {testResult}
        </div>
      )}
    </div>
  );
};

export default DebugAuth; 