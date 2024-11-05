import express from 'express';
import { mockUsers } from '../data/mockData';
import logger from '../../../../../infrastructure/logging/logger';

const mockRouter = express.Router();

mockRouter.post('/users', (req, res) => {
  try {
    const newUser = {
      id: Date.now().toString(),
      ...req.body,
      feedbacks: req.body.feedbacks.map((feedback: any) => ({
        id: Date.now().toString(),
        ...feedback,
        createdAt: new Date().toISOString()
      }))
    };
    mockUsers.push(newUser);
    logger.info('Mock: Created new user');
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('Mock: Error creating user');
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { mockRouter };