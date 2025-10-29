import { body } from 'express-validator'

export const productValidation = [
  body('title', 'Please enter the product name'),
  body('type', 'Please specify the product type'),
  body('serialNumber', 'The serial number must be at least 6 characters long').isLength({ min: 6 }),
  body('isNew').required(),
  body('photo').optional(),
  body('specification').optional(),
  body('guaranteeStart').optional(),
  body('guaranteeEnd').optional(),
]
