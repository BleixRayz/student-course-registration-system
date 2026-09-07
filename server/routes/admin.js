const express = require('express');
const db = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Add new course (admin only)
router.post('/courses', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { code, name, description, credits, capacity, instructor, department_id } = req.body;

    if (!code || !name || !credits || !capacity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.query(
      'INSERT INTO courses (code, name, description, credits, capacity, instructor, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [code, name, description, credits, capacity, instructor, department_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create course', details: err.message });
  }
});

// Update course (admin only)
router.put('/courses/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { code, name, description, credits, capacity, instructor, department_id } = req.body;

    const result = await db.query(
      'UPDATE courses SET code=$1, name=$2, description=$3, credits=$4, capacity=$5, instructor=$6, department_id=$7 WHERE id=$8 RETURNING *',
      [code, name, description, credits, capacity, instructor, department_id, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update course', details: err.message });
  }
});

// Delete course (admin only)
router.delete('/courses/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await db.query('DELETE FROM courses WHERE id=$1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course', details: err.message });
  }
});

// Add new student (admin only)
router.post('/students', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, email, password, student_id } = req.body;

    if (!name || !email || !password || !student_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, hashedPassword, 'student']
    );

    await db.query(
      'INSERT INTO students (user_id, student_id) VALUES ($1, $2)',
      [userResult.rows[0].id, student_id]
    );

    res.status(201).json({ message: 'Student added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add student', details: err.message });
  }
});

// Delete student (admin only)
router.delete('/students/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM students WHERE user_id=$1', [req.params.id]);
    await db.query('DELETE FROM users WHERE id=$1', [req.params.id]);

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete student', details: err.message });
  }
});

// Manage departments (admin only)
router.post('/departments', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ error: 'Department name and code are required' });
    }

    const result = await db.query(
      'INSERT INTO departments (name, code) VALUES ($1, $2) RETURNING *',
      [name, code]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create department', details: err.message });
  }
});

// Get all registrations (admin only)
router.get('/registrations/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT r.id, r.registration_date, s.student_id, u.name as student_name, c.code, c.name as course_name, r.status
       FROM registrations r
       JOIN students s ON r.student_id = s.id
       JOIN users u ON s.user_id = u.id
       JOIN courses c ON r.course_id = c.id
       ORDER BY r.registration_date DESC`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations', details: err.message });
  }
});

// Generate reports (admin only)
router.get('/reports/enrollment', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.code, c.name, COUNT(r.id) as enrolled, c.capacity
       FROM courses c
       LEFT JOIN registrations r ON c.id = r.course_id AND r.status = 'active'
       GROUP BY c.id, c.code, c.name, c.capacity
       ORDER BY c.code`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate report', details: err.message });
  }
});

router.get('/reports/student-courses', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT u.name, COUNT(r.id) as courses_registered
       FROM users u
       LEFT JOIN students s ON u.id = s.user_id
       LEFT JOIN registrations r ON s.id = r.student_id AND r.status = 'active'
       WHERE u.role = 'student'
       GROUP BY u.id, u.name
       ORDER BY u.name`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate report', details: err.message });
  }
});

module.exports = router;
