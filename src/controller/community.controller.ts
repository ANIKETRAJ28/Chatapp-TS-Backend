import { Request, Response } from 'express';
import { ICommunityRequest } from '../interface/community.interface';
import { CommunityService } from '../service/community.service';
import { BadRequest, Created, InternalServerError, sendResponse, Unauthorized } from '../util/apiResponse.util';

export class CommunityController {
  private communityService: CommunityService;

  constructor() {
    this.communityService = new CommunityService();
  }

  createGroupCommunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const communityPayload: ICommunityRequest = req.body.community;
      const userId = req.id;
      if (!userId) {
        sendResponse(res, new Unauthorized('User not authorized'));
        return;
      }
      if (!communityPayload) {
        sendResponse(res, new BadRequest('Inufficient data to create group'));
        return;
      }
      const community = await this.communityService.createGroupCommunity(communityPayload, userId);
      sendResponse(res, new Created('Group created successfully', community));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  createFriendCommunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const friendId = req.params.friendId;
      const userId = req.id;
      if (!userId) {
        sendResponse(res, new Unauthorized('User not authorized'));
        return;
      }
      if (!friendId) {
        sendResponse(res, new BadRequest('Friend Id required to be friend'));
        return;
      }
      const community = await this.communityService.createFriendCommunity(friendId, userId);
      sendResponse(res, new Created('Friend added successfully', community));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };
}
