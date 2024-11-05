import { Router } from 'express';
// Cambia la ruta de importación (quita el /)
import { userController } from '../controllers/userController';
import { createUserValidator } from '../middleware/validators/userValidator';

const router = Router();

// Asegúrate de usar userController (que es la instancia exportada)
router.post('/users', createUserValidator, userController.createUser);

export default router;