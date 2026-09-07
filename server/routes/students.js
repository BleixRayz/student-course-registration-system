const express = require('express');
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all students (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT u.id, u.name, u.email, s.student_id FROM users u JOIN students s ON u.id = s.user_id'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students', details: err.message });
  }
});

// Get student by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT u.id, u.name, u.email, s.student_id FROM users u JOIN students s ON u.id = s.user_id WHERE u.id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch student', details: err.message });
  }
});

module.exports = router;
