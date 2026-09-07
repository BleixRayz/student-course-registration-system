import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  return (
    <div>
      <Navbar userRole="student" onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to Course Registration</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600" onClick={() => navigate('/courses')}>
            <h2 className="text-2xl font-bold mb-2">Browse Courses</h2>
            <p>View all available courses and register</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-green-600" onClick={() => navigate('/my-registrations')}>
            <h2 className="text-2xl font-bold mb-2">My Registrations</h2>
            <p>View your registered courses</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Student Info</h2>
            <p>Manage your account information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
