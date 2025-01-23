import { Request, Response, Router } from 'express';
import { UserController } from '../controller/user.controller';
import { BadRequest, sendResponse } from '../util/apiResponse.util';

const userController = new UserController();

export const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', (req: Request, res: Response) => {
  const { email, username, id } = req.query;
  if (email) {
    userController.findUserByEmail(req, res);
  } else if (username) {
    userController.findUserByUsername(req, res);
  } else if (id) {
    userController.findUserById(req, res);
  } else sendResponse(res, new BadRequest('Please provide a valid query parameter'));
});
