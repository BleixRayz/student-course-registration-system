const express = require('express');
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Student registers for a course
router.post('/register', authMiddleware, async (req, res) => {
  try {
    const { course_id } = req.body;
    const userId = req.user.id;

    if (!course_id) {
      return res.status(400).json({ error: 'Course ID is required' });
    }

    // Get student ID
    const studentResult = await db.query('SELECT id FROM students WHERE user_id = $1', [userId]);
    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const studentId = studentResult.rows[0].id;

    // Check if already registered
    const existingRegistration = await db.query(
      'SELECT * FROM registrations WHERE student_id = $1 AND course_id = $2 AND status = \'active\'',
      [studentId, course_id]
    );
    if (existingRegistration.rows.length > 0) {
      return res.status(400).json({ error: 'Already registered for this course' });
    }

    // Check course capacity
    const enrollmentResult = await db.query(
      'SELECT COUNT(*) as enrolled FROM registrations WHERE course_id = $1 AND status = \'active\'',
      [course_id]
    );
    const courseResult = await db.query('SELECT capacity FROM courses WHERE id = $1', [course_id]);
    
    if (parseInt(enrollmentResult.rows[0].enrolled) >= courseResult.rows[0].capacity) {
      return res.status(400).json({ error: 'Course is full' });
    }

    // Register student
    await db.query(
      'INSERT INTO registrations (student_id, course_id, status) VALUES ($1, $2, $3)',
      [studentId, course_id, 'active']
    );

    res.status(201).json({ message: 'Successfully registered for course' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// Get student's registered courses
router.get('/my-courses', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT c.id, c.code, c.name, c.description, c.credits, c.instructor, r.registration_date
       FROM registrations r
       JOIN courses c ON r.course_id = c.id
       JOIN students s ON r.student_id = s.id
       WHERE s.user_id = $1 AND r.status = 'active'
       ORDER BY c.code`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
});

// Student cancels course registration
router.post('/cancel/:registrationId', authMiddleware, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const userId = req.user.id;

    // Verify ownership
    const registrationResult = await db.query(
      `SELECT r.id FROM registrations r
       JOIN students s ON r.student_id = s.id
       WHERE r.id = $1 AND s.user_id = $2`,
      [registrationId, userId]
    );

    if (registrationResult.rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    await db.query('UPDATE registrations SET status = $1 WHERE id = $2', ['cancelled', registrationId]);

    res.json({ message: 'Course registration cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Cancellation failed', details: err.message });
  }
});

module.exports = router;
