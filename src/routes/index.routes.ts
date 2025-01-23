import { Router } from 'express';
import { communityRouter } from './community.routes';
import { messageRouter } from './message.routes';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';
import { jwtMiddleware } from '../middleware/auth.middleware';

export const apiRouter = Router();

apiRouter.use('/user', jwtMiddleware, userRouter);
apiRouter.use('/message', jwtMiddleware, messageRouter);
apiRouter.use('/community', jwtMiddleware, communityRouter);
apiRouter.use('/auth', authRouter);
