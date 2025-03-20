  import express from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import swaggerUi from 'swagger-ui-express';
  import swaggerJsdoc from 'swagger-jsdoc';
  import userRoutes from './routes/userRoutes.js';
  import projectRoutes from './routes/projectRoutes.js';
  import taskRoutes from './routes/taskRoutes.js';
  import { errorHandler } from './middleware/errorHandler.js';
  import moment from 'moment-timezone';

  dotenv.config();

  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Configuración de la zona horaria
  const timezone = process.env.TIMEZONE || 'America/El_Salvador'; // Si no se establece, usa la zona horaria por defecto
  moment.tz.setDefault(timezone); // Establece la zona horaria por defecto

  // Swagger configuracion
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API para Gestión de Proyectos',
        version: '1.0.0',
        description: 'API para gestionar usuarios, proyectos y tareas',
      },
    },
    apis: ['./routes/*.js'], // Ruta a las rutas de la API
  };

  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


  // Routes
  app.use('/api', userRoutes);
  app.use('/api/proyectos', projectRoutes);
  app.use('/api/tareas', taskRoutes);

  // Error handling middleware
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`El servidor se está ejecutando en el puerto ${port}`);
    console.log(`La zona horaria actual es: ${timezone}`);
  });
