import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { Express } from 'express';
import logger from '../../../../infrastructure/logging/logger';
import { mockRouter } from '../mocks/routes/mockRouter';

export class SwaggerConfig {
  static setup(app: Express, enableMocks = false): void {
    try {
      // Load main Swagger file
      const swaggerDocument = YAML.load(
        path.join(__dirname, '../v1/openapi.yaml')
      );

      // Swagger UI options
      const options = {
        explorer: true,
        swaggerOptions: {
          urls: [
            {
              url: '/api/v1/swagger.json',
              name: 'v1'
            }
          ]
        }
      };

      // Serve Swagger documentation
      app.use('/api-docs', swaggerUi.serve);
      app.use('/api-docs', swaggerUi.setup(swaggerDocument, options));

      // Enable mock routes if in development
      if (enableMocks && process.env.NODE_ENV === 'development') {
        app.use('/api/v1/mock', mockRouter);
        logger.info('Mock routes enabled at /api/v1/mock');
      }

      logger.info('Swagger documentation initialized at /api-docs');
    } catch (error) {
      logger.error('Failed to initialize Swagger documentation');
    }
  }
}