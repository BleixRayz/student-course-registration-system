import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getMyRegistrations, cancelRegistration } from '../services/api';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await getMyRegistrations();
      setRegistrations(response.data);
    } catch (err) {
      setError('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (registrationId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      try {
        await cancelRegistration(registrationId);
        setRegistrations(registrations.filter(r => r.id !== registrationId));
        alert('Registration cancelled successfully');
      } catch (err) {
        alert(err.response?.data?.error || 'Cancellation failed');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading registrations...</div>;

  return (
    <div>
      <Navbar userRole="student" onLogout={() => {}} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Registrations</h1>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
        {registrations.length === 0 ? (
          <p className="text-gray-600 text-lg">You are not registered for any courses yet.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Course Code</th>
                  <th className="px-6 py-3 text-left font-semibold">Course Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Credits</th>
                  <th className="px-6 py-3 text-left font-semibold">Instructor</th>
                  <th className="px-6 py-3 text-left font-semibold">Registration Date</th>
                  <th className="px-6 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold text-blue-600">{reg.code}</td>
                    <td className="px-6 py-3">{reg.name}</td>
                    <td className="px-6 py-3">{reg.credits}</td>
                    <td className="px-6 py-3">{reg.instructor}</td>
                    <td className="px-6 py-3">{new Date(reg.registration_date).toLocaleDateString()}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleCancel(reg.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;
