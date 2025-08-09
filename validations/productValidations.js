import { body } from 'express-validator'

export const productValidation = [
  body('title', 'Укажите название продукта'),
  body('type', 'Укажите тип продукта'),
  body('serialNumber', 'Серийный номер должен быть минимум 6 символов').isLength({ min: 6 }),
  body('isNew').required(),
  body('photo').optional(),
  body('specification').optional(),
  body('guaranteeStart').optional(),
  body('guaranteeEnd').optional(),
]
