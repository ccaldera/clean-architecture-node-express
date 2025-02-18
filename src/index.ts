import { body } from 'express-validator';
import { container } from './inversify.config';
import { LoginEndpoint } from './presentation/endpoints/login.endpoint'
import express from "express";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express()
const port = 3000

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My Express API',
      description: 'API documentation for my Express app',
      version: '1.0.0',
    },
    host: 'localhost:3000', // Change this to your production host URL
    basePath: '/',
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs (JSDoc comments)
};

// Initialize Swagger JSDoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const loginEndpoint = container.get<LoginEndpoint>(LoginEndpoint);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post(
  '/login',
  [
    body('email').isEmail().notEmpty().withMessage('Username is required'),
    body('password').isString().notEmpty().withMessage('Password is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req:any, res:any) => {
    await loginEndpoint.login(req, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);  
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
})
