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
import { AuthService } from '../service/auth.service';

export class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
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
      const password = req.body.password;
      if (!email || typeof email !== 'string') {
        sendResponse(res, new BadRequest('Email required'));
        return;
      }
      if (!password) {
        sendResponse(res, new BadRequest('Password required'));
        return;
      }
      const token = await this.authService.signInByEmail(email, password);

      const options = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('JWT', token, options);
      sendResponse(res, new Success('User signin successfully'));
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
      const password = req.body.password;
      if (!username || typeof username !== 'string') {
        sendResponse(res, new BadRequest('Id required'));
        return;
      }
      if (!password) {
        sendResponse(res, new BadRequest('Password required'));
        return;
      }
      const token = await this.authService.signInByUsername(username, password);
      const options = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('JWT', token, options);
      sendResponse(res, new Success('User signin successfully'));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };
}
