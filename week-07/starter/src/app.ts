import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import resourceRouter from './routes/resource.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/v1/auth', authRouter);

app.use('/api/v1/instruments', resourceRouter);

// Middlewares de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);
