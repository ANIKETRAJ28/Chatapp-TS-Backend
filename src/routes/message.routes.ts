import { Request, Response, Router } from 'express';
import { MessageController } from '../controller/message.controller';
import { BadRequest, sendResponse } from '../util/apiResponse.util';

const messageController = new MessageController();

export const messageRouter = Router();

messageRouter.post('/', messageController.createMessage);
messageRouter.get('/', (req: Request, res: Response) => {
  const { communityId, id } = req.query;

  if (communityId) {
    messageController.getMessageByCommunityId(req, res);
  } else if (id) {
    messageController.getMessageById(req, res);
  } else sendResponse(res, new BadRequest('Please provide a valid query parameter'));
});
