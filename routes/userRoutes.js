const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  registerUser,
  loginUser,
  getUserProfile
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Input validation rules for user registration
const validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name must not be empty'),
  body('email').isEmail().withMessage('Email must be a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Mount endpoints
router.post('/register', validateRegistration, registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
