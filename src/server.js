import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { env } from './utils/.env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactRoutes from './routes/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();


export async function setupServer() {
  const app = express();
  const PORT = Number(env('PORT', '3000'));
  //   app.use(express.json());

  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(contactRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
}
