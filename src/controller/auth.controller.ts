import { CookieOptions, Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { IUserRequest } from '../interface/user.interface';
import {
  BadRequest,
  Created,
  InternalServerError,
  sendResponse,
  Success,
  Unauthorized,
} from '../util/apiResponse.util';
import { createJWTtoken } from '../util/jwt.util';

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const userPayload: IUserRequest = req.body.user;
      if (!userPayload) sendResponse(res, new BadRequest('Insufficient data for creating user'));
      const user = await this.userService.createUser(userPayload);
      const token = createJWTtoken(user);
      const options = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('JWT', token, options);
      sendResponse(res, new Created('User created successfully'));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  signInUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const email = req.query.email;
      if (!email || typeof email !== 'string') {
        sendResponse(res, new BadRequest('Email required'));
        return;
      }
      const user = await this.userService.findUserByEmail(email);
      const token = createJWTtoken(user);
      const options = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('JWT', token, options);
      sendResponse(res, new Success('User found successfully'));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  signInUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.query.id;
      if (!id || typeof id !== 'string') {
        sendResponse(res, new BadRequest('Id required'));
        return;
      }
      const user = await this.userService.findUserById(id);
      const token = createJWTtoken(user);
      const options = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('JWT', token, options);
      sendResponse(res, new Success('User found successfully'));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  signInUserByUsername = async (req: Request, res: Response): Promise<void> => {
    try {
      const username = req.query.username;
      if (!username || typeof username !== 'string') {
        sendResponse(res, new BadRequest('Id required'));
        return;
      }
      const user = await this.userService.findUserByUsername(username);
      const token = createJWTtoken(user);
      const options = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('JWT', token, options);
      sendResponse(res, new Success('User found successfully'));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };
}
