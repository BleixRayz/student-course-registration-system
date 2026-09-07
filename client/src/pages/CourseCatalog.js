import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getAllCourses, registerForCourse, getCourseEnrollment } from '../services/api';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [enrollmentInfo, setEnrollmentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registeredCourses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response.data);
      
      // Fetch enrollment info for each course
      response.data.forEach(course => {
        fetchEnrollment(course.id);
      });
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollment = async (courseId) => {
    try {
      const response = await getCourseEnrollment(courseId);
      setEnrollmentInfo(prev => ({ ...prev, [courseId]: response.data }));
    } catch (err) {
      console.error('Failed to fetch enrollment for course', courseId);
    }
  };

  const handleRegister = async (courseId) => {
    try {
      await registerForCourse({ course_id: courseId });
      setRegisteredCourses([...registeredCourses, courseId]);
      alert('Successfully registered for the course!');
      fetchEnrollment(courseId);
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  if (loading) return <div className="text-center py-8">Loading courses...</div>;

  return (
    <div>
      <Navbar userRole="student" onLogout={() => {}} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Available Courses</h1>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => {
            const enrollment = enrollmentInfo[course.id] || { enrolled: 0, capacity: 0, available: 0 };
            const isRegistered = registeredCourses.includes(course.id);
            const isFull = enrollment.available <= 0;

            return (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-xl font-bold mb-2 text-blue-600">{course.code}</h2>
                <p className="text-gray-800 font-semibold mb-1">{course.name}</p>
                <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                <p className="text-gray-700 mb-1"><strong>Credits:</strong> {course.credits}</p>
                <p className="text-gray-700 mb-1"><strong>Instructor:</strong> {course.instructor}</p>
                <p className="text-gray-700 mb-1"><strong>Department:</strong> {course.department}</p>
                <p className="text-gray-700 mb-4">
                  <strong>Enrollment:</strong> {enrollment.enrolled}/{enrollment.capacity}
                </p>
                <button
                  onClick={() => handleRegister(course.id)}
                  disabled={isRegistered || isFull}
                  className={`w-full py-2 rounded font-semibold ${
                    isRegistered
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : isFull
                      ? 'bg-red-400 text-white cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isRegistered ? 'Already Registered' : isFull ? 'Course Full' : 'Register'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
