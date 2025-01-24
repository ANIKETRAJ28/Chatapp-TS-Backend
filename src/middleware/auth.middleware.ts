import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IJWT } from '../interface/jwt.interface';
import { InternalServerError, sendResponse, Success, Unauthorized } from '../util/apiResponse.util';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const jwtCookie = req.cookies['JWT'];
    if (!jwtCookie) {
      throw new Unauthorized('User not authenticated');
    }
    const decodedToken = jwt.decode(jwtCookie);
    if (!decodedToken || typeof decodedToken === 'string' || !decodedToken.exp) {
      throw new Error('User not authenticated');
    }
    if (decodedToken.exp * 1000 < Date.now()) {
      throw new Unauthorized('User not authenticated');
    }
    const tokenData = decodedToken as unknown as IJWT;

    req.id = tokenData.id.toString();
    next();
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, new InternalServerError('Error', error.message));
    } else {
      sendResponse(res, new Unauthorized('Error', error));
    }
  }
}

export function getUserInfo(req: Request, res: Response): void {
  try {
    const jwtCookie = req.cookies['JWT'];
    if (!jwtCookie) {
      throw new Unauthorized('User not authenticated');
    }
    const decodedToken = jwt.decode(jwtCookie);
    if (!decodedToken) {
      throw new Error('User not authenticated');
    }
    sendResponse(res, new Success('User info fetched successfully', decodedToken));
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, new InternalServerError('Error', error.message));
    } else {
      sendResponse(res, new Unauthorized('Error', error));
    }
  }
}
