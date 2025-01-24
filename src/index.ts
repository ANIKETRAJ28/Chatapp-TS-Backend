import express, { Express, Request, Response } from 'express';
import { FORNTEND_URL, PORT } from './config/env.config';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/index.routes';
import cors from 'cors';
import { initSocket } from './socket';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: FORNTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api', apiRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Alive...');
});

const server = app.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
});

initSocket(server);
