import { Request, Response } from 'express';
import { UserCommunityService } from '../service/userCommunity.service';
import { BadRequest, Created, InternalServerError, sendResponse, Unauthorized } from '../util/apiResponse.util';

export class UserCommunityController {
  private userCommunityService: UserCommunityService;

  constructor() {
    this.userCommunityService = new UserCommunityService();
  }

  addUserToCommunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.id;
      const memberId = req.params.memberId;
      const communityId = req.params.communityId;
      if (!userId) {
        sendResponse(res, new Unauthorized('User not authorized'));
        return;
      }
      if (!communityId) {
        sendResponse(res, new BadRequest('Community Id required'));
        return;
      }
      if (!memberId) {
        sendResponse(res, new BadRequest('Member Id required'));
        return;
      }
      const member = await this.userCommunityService.addUserToCommunity(userId, memberId, communityId);
      sendResponse(res, new Created('Added user to community successfully', member));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  removeUserFromCommunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.id;
      const memberId = req.params.memberId;
      const communityId = req.params.communityId;
      if (!userId) {
        sendResponse(res, new Unauthorized('User not authorized'));
        return;
      }
      if (!communityId) {
        sendResponse(res, new BadRequest('Community Id required'));
        return;
      }
      if (!memberId) {
        sendResponse(res, new BadRequest('Member Id required'));
        return;
      }
      const member = await this.userCommunityService.removeUserFromCommunity(userId, memberId, communityId);
      sendResponse(res, new Created('Removed user from community successfully', member));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  promoteUserToAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.id;
      const memberId = req.params.memberId;
      const communityId = req.params.communityId;
      if (!userId) {
        sendResponse(res, new Unauthorized('User not authorized'));
        return;
      }
      if (!communityId) {
        sendResponse(res, new BadRequest('Community Id required'));
        return;
      }
      if (!memberId) {
        sendResponse(res, new BadRequest('Member Id required'));
        return;
      }

      const member = await this.userCommunityService.promoteUserToAdmin(userId, memberId, communityId);
      sendResponse(res, new Created('Promoted user to admin successfully', member));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  demoteUserFromAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.id;
      const memberId = req.params.memberId;
      const communityId = req.params.communityId;
      if (!userId) {
        sendResponse(res, new Unauthorized('User not authorized'));
        return;
      }
      if (!communityId) {
        sendResponse(res, new BadRequest('Community Id required'));
        return;
      }
      if (!memberId) {
        sendResponse(res, new BadRequest('Member Id required'));
        return;
      }

      const member = await this.userCommunityService.demoteUserFromAdmin(userId, memberId, communityId);
      sendResponse(res, new Created('Demoted user from admin successfully', member));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  getUserCommunities = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.id;
      if (!userId) {
        sendResponse(res, new Unauthorized('User not authorized'));
        return;
      }
      const communities = await this.userCommunityService.getUserCommunities(userId);
      sendResponse(res, new Created('Fetched user communities successfully', communities));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };

  getCommunityMembers = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.id;
      const communityId = req.params.communityId;
      if (!userId) {
        sendResponse(res, new Unauthorized('User not authorized'));
        return;
      }
      if (!communityId) {
        sendResponse(res, new BadRequest('Community Id required'));
        return;
      }
      const communities = await this.userCommunityService.getCommunityMembers(communityId);
      sendResponse(res, new Created('Fetched community members successfully', communities));
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, new InternalServerError('Error', error.message));
      } else {
        sendResponse(res, new Unauthorized('Error', error));
      }
    }
  };
}
