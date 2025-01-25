import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { IUserRequest } from '../interface/user.interface';
import { BadRequest, Created, InternalServerError, sendResponse, Unauthorized } from '../util/apiResponse.util';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userPayload: IUserRequest = req.body.user;
      if (!userPayload) sendResponse(res, new BadRequest('Insufficient data for creating user'));
      const user = await this.userService.createUser(userPayload);
      sendResponse(res, new Created('User created successfully', user));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  findUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const email = req.query.email;
      if (!email || typeof email !== 'string') {
        sendResponse(res, new BadRequest('Email required'));
        return;
      }
      const user = await this.userService.findUserByEmail(email);
      sendResponse(res, new Created('User found successfully', user));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  findUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.query.id;
      if (!id || typeof id !== 'string') {
        sendResponse(res, new BadRequest('Id required'));
        return;
      }
      const user = await this.userService.findUserById(id);
      sendResponse(res, new Created('User found successfully', user));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  findUserByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
      const username = req.query.username;
      if (!username || typeof username !== 'string') {
        sendResponse(res, new BadRequest('Id required'));
        return;
      }
      const user = await this.userService.findUserByUsername(username);
      sendResponse(res, new Created('User found successfully', user));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  findUserWithQuery = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.query;
      if (!query || typeof query !== 'string') {
        sendResponse(res, new BadRequest('Query required'));
        return;
      }
      const user = await this.userService.findUserWithQuery(query);
      sendResponse(res, new Created('Users found successfully', user));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };
}
