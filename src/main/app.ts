import express from 'express';
import cors from 'cors';
import userRoutes from '../presentation/api/routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../presentation/api/swagger/swagger.json');
// ... existing code ...
import { SwaggerConfig } from '../presentation/api/swagger/config/swaggerConfig';
// ... rest of the code ...
// Crear la aplicación Express
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', userRoutes);
// Ejemplo de cómo se implementa la UI de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Accesible en: http://localhost:3000/api-docs
// Initialize Swagger with mocks in development
const enableMocks = process.env.NODE_ENV === 'development';
SwaggerConfig.setup(app, enableMocks);

export default app; 