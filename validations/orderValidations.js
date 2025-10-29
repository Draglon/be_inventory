import { body } from 'express-validator'

export const orderValidation = [
  body('title', 'Specify the order name').required(),
  body('description', 'Please provide a description of the order').required(),
]
