import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Subscriptions from './pages/Subscriptions';
import Expenses from './pages/Expenses';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Layout from './components/layout/Layout';
import PrivateRoute from './routes/PrivateRoute';
import BackendStatus from './components/BackendStatus';
import DebugAuth from './components/DebugAuth';
import TestButtons from './components/TestButtons';

function App() {
  return (
    <BrowserRouter>
      <BackendStatus />
      <DebugAuth />
      <TestButtons />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
