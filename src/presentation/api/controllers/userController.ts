import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { userRepository } from '../../../infrastructure/persistence/InMemoryUserRepository';

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const user = {
        id: uuidv4(),
        ...req.body,
        feedbacks: []
      };

      const createdUser = await userRepository.create(user);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }
}

export const userController = new UserController(); 