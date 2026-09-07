import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getEnrollmentReport, getStudentCoursesReport, getAllRegistrations } from '../services/api';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [enrollmentReport, setEnrollmentReport] = useState([]);
  const [studentCoursesReport, setStudentCoursesReport] = useState([]);
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [enrollment, studentCourses, registrations] = await Promise.all([
        getEnrollmentReport(),
        getStudentCoursesReport(),
        getAllRegistrations(),
      ]);
      setEnrollmentReport(enrollment.data);
      setStudentCoursesReport(studentCourses.data);
      setAllRegistrations(registrations.data);
    } catch (err) {
      console.error('Failed to fetch reports', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;

  return (
    <div>
      <Navbar userRole="admin" onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('enrollment')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'enrollment' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Enrollment Report
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Student Courses
          </button>
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'registrations' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All Registrations
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Total Registrations</h2>
              <p className="text-4xl font-bold">{allRegistrations.length}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Total Courses</h2>
              <p className="text-4xl font-bold">{enrollmentReport.length}</p>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Active Students</h2>
              <p className="text-4xl font-bold">{studentCoursesReport.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'enrollment' && (
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Course Code</th>
                  <th className="px-6 py-3 text-left font-semibold">Course Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Enrolled</th>
                  <th className="px-6 py-3 text-left font-semibold">Capacity</th>
                  <th className="px-6 py-3 text-left font-semibold">Available</th>
                </tr>
              </thead>
              <tbody>
                {enrollmentReport.map((course, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-semibold">{course.code}</td>
                    <td className="px-6 py-3">{course.name}</td>
                    <td className="px-6 py-3">{course.enrolled || 0}</td>
                    <td className="px-6 py-3">{course.capacity}</td>
                    <td className="px-6 py-3 font-semibold text-green-600">{course.capacity - (course.enrolled || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Student Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Courses Registered</th>
                </tr>
              </thead>
              <tbody>
                {studentCoursesReport.map((student, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{student.name}</td>
                    <td className="px-6 py-3 font-semibold">{student.courses_registered || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Student ID</th>
                  <th className="px-6 py-3 text-left font-semibold">Student Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Course</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {allRegistrations.map((reg, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{reg.student_id}</td>
                    <td className="px-6 py-3">{reg.student_name}</td>
                    <td className="px-6 py-3 font-semibold">{reg.code} - {reg.course_name}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        reg.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">{new Date(reg.registration_date).toLocaleDateString()}</td>
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

export default AdminDashboard;
