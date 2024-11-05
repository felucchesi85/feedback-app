import { body, ValidationChain } from 'express-validator';

export const createUserValidator: ValidationChain[] = [
  body('nationalId')
    .matches(/^[0-9]{8}[A-Z]$/)
    .withMessage('Invalid national ID format'),
  body('firstName')
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/),
  body('lastName')
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/),
  body('email')
    .isEmail()
    .normalizeEmail()
]; 