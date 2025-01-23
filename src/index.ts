import express, { Express, Request, Response } from 'express';
import { PORT } from './config/env.config';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/index.routes';
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api', apiRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Alive...');
});

app.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
});
