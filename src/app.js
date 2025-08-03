import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger.js';
import cors from 'cors';

import indexRouter from './routes/index.js';
import releaseRouter from './routes/pluginReleases.js'


import dotenv from 'dotenv';
dotenv.config();


const app = express();
// const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Swagger UI ruta
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: [,'http://localhost:4000','http://localhost:3000', '157.180.37.247', 'https://rafplugins.store/'],

  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// Rute
app.use('/api/v1', indexRouter);       // Osnovna ruta (/)
app.use('/api/v1/teacherplugin', releaseRouter);





// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


export default app;