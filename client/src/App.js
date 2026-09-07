import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import CourseCatalog from './pages/CourseCatalog';
import MyRegistrations from './pages/MyRegistrations';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="student">
                <StudentDashboard onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/courses"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="student">
                <CourseCatalog />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/my-registrations"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="student">
                <MyRegistrations />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} requiredRole="admin">
                <AdminDashboard onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
