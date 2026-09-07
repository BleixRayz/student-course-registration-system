import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userRole, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Course Registration</div>
        <div className="flex items-center space-x-6">
          {userRole === 'student' && (
            <>
              <button onClick={() => navigate('/student-dashboard')} className="hover:bg-blue-700 px-3 py-2 rounded">
                Dashboard
              </button>
              <button onClick={() => navigate('/courses')} className="hover:bg-blue-700 px-3 py-2 rounded">
                Courses
              </button>
              <button onClick={() => navigate('/my-registrations')} className="hover:bg-blue-700 px-3 py-2 rounded">
                My Registrations
              </button>
            </>
          )}
          {userRole === 'admin' && (
            <button onClick={() => navigate('/admin')} className="hover:bg-blue-700 px-3 py-2 rounded">
              Admin Panel
            </button>
          )}
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
