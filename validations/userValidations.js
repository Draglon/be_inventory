import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Invalid mail format').trim().isEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
]

export const registerValidation = [
  body('email', 'Invalid mail format').trim().isEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
]
