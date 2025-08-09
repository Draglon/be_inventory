import { body } from 'express-validator'

export const orderValidation = [
  body('title', 'Укажите название ордера').required(),
  body('description', 'Укажите описание ордера').required(),
]
