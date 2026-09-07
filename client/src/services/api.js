import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

// Auth API
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const registerAdmin = (data) => axios.post(`${API_URL}/auth/admin-register`, data);

// Course API
export const getAllCourses = () => axios.get(`${API_URL}/courses`);
export const getCourseById = (id) => axios.get(`${API_URL}/courses/${id}`);
export const getCourseEnrollment = (id) => axios.get(`${API_URL}/courses/${id}/enrollment`);

// Registration API
export const registerForCourse = (data) => axios.post(`${API_URL}/registrations/register`, data, getAuthHeader());
export const getMyRegistrations = () => axios.get(`${API_URL}/registrations/my-courses`, getAuthHeader());
export const cancelRegistration = (registrationId) => axios.post(`${API_URL}/registrations/cancel/${registrationId}`, {}, getAuthHeader());

// Student API
export const getAllStudents = () => axios.get(`${API_URL}/students`, getAuthHeader());
export const getStudentById = (id) => axios.get(`${API_URL}/students/${id}`, getAuthHeader());

// Admin API
export const addCourse = (data) => axios.post(`${API_URL}/admin/courses`, data, getAuthHeader());
export const updateCourse = (id, data) => axios.put(`${API_URL}/admin/courses/${id}`, data, getAuthHeader());
export const deleteCourse = (id) => axios.delete(`${API_URL}/admin/courses/${id}`, getAuthHeader());
export const addStudent = (data) => axios.post(`${API_URL}/admin/students`, data, getAuthHeader());
export const deleteStudent = (id) => axios.delete(`${API_URL}/admin/students/${id}`, getAuthHeader());
export const addDepartment = (data) => axios.post(`${API_URL}/admin/departments`, data, getAuthHeader());
export const getAllRegistrations = () => axios.get(`${API_URL}/admin/registrations/all`, getAuthHeader());
export const getEnrollmentReport = () => axios.get(`${API_URL}/admin/reports/enrollment`, getAuthHeader());
export const getStudentCoursesReport = () => axios.get(`${API_URL}/admin/reports/student-courses`, getAuthHeader());
