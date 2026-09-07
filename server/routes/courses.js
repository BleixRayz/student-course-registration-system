const express = require('express');
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT c.id, c.code, c.name, c.description, c.credits, c.capacity, c.instructor, d.name as department FROM courses c LEFT JOIN departments d ON c.department_id = d.id'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT c.id, c.code, c.name, c.description, c.credits, c.capacity, c.instructor, d.name as department FROM courses c LEFT JOIN departments d ON c.department_id = d.id WHERE c.id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course', details: err.message });
  }
});

// Get course enrollment
router.get('/:id/enrollment', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT COUNT(*) as enrolled_count FROM registrations WHERE course_id = $1 AND status = \'active\'',
      [req.params.id]
    );
    const course = await db.query('SELECT capacity FROM courses WHERE id = $1', [req.params.id]);
    
    res.json({
      enrolled: parseInt(result.rows[0].enrolled_count),
      capacity: course.rows[0].capacity,
      available: course.rows[0].capacity - parseInt(result.rows[0].enrolled_count)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enrollment', details: err.message });
  }
});

module.exports = router;
