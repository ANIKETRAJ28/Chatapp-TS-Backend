import { Request, Response, Router } from 'express';
import { AuthController } from '../controller/auth.controller';
import { BadRequest, sendResponse, Success } from '../util/apiResponse.util';

const authController = new AuthController();

export const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.get('/signin', (req: Request, res: Response) => {
  const { email, username, id } = req.query;
  if (email) {
    authController.signInUserByEmail(req, res);
  } else if (username) {
    authController.signInUserByUsername(req, res);
  } else if (id) {
    authController.signInUserById(req, res);
  } else sendResponse(res, new BadRequest('Please provide a valid query parameter'));
});
authRouter.get('/logout', (_: Request, res: Response) => {
  res.clearCookie('JWT');
  sendResponse(res, new Success('Successfully logout'));
});
