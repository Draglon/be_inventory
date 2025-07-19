import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Неверный формат почты').trim().isEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
]

export const registerValidation = [
  body('email', 'Неверный формат почты').trim().isEmail(),
  body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
]
