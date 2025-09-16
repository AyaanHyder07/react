import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import CollegeLandingPage from './components/CollegeLandingPage'; // ✅ Import your new landing page
import LoginPortal from './components/LoginPortal';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ FIX: The root path "/" now shows your new landing page */}
        <Route path="/" element={<CollegeLandingPage />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<LoginPortal />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (This stays the same) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;