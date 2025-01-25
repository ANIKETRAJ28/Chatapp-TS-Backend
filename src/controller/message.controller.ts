import { Request, Response } from 'express';
import { MessageService } from '../service/message.service';
import { IMessageRequest } from '../interface/message.interface';
import {
  BadRequest,
  Created,
  InternalServerError,
  sendResponse,
  Success,
  Unauthorized,
} from '../util/apiResponse.util';

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.id;
      if (!userId) throw new Unauthorized('User not authenticated');
      const messagePayload: Omit<IMessageRequest & { communityType: string | undefined }, 'userId'> = req.body.message;
      if (!messagePayload) {
        sendResponse(res, new BadRequest('Insufficient data to create message'));
        return;
      }
      const message = await this.messageService.createMessage({ ...messagePayload, userId });
      sendResponse(res, new Created('Message created successfully', message));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  getMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.query.id;
      if (!id || typeof id !== 'string') {
        sendResponse(res, new BadRequest('Id required to get message'));
        return;
      }
      const message = await this.messageService.getMessageById(id);
      sendResponse(res, new Success('Message fetched successfully', message));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  getMessageByCommunityId = async (req: Request, res: Response): Promise<void> => {
    try {
      const communityId = req.query.communityId;
      if (!communityId || typeof communityId !== 'string') {
        sendResponse(res, new BadRequest('community Id required to get messages'));
        return;
      }
      const messages = await this.messageService.getMessageByCommunityId(communityId);
      sendResponse(res, new Success('Messages fetched successfully', messages));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };
}
