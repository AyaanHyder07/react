import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import CollegeLandingPage from './components/CollegeLandingPage'; 
import LoginPortal from './components/LoginPortal';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CollegeLandingPage />} />
        
        <Route path="/login" element={<LoginPortal />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;