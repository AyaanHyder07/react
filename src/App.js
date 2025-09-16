import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";

// Import Components
import LoginPortal from './components/LoginPortal';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import the guard

function App() {
  return (
    <Router>
      <Routes>
        {/* These routes are PUBLIC */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPortal />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ All routes wrapped by ProtectedRoute will require login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;