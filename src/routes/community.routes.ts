import { Router } from 'express';
import { CommunityController } from '../controller/community.controller';
import { UserCommunityController } from '../controller/userCommunity.controller';

const communityController = new CommunityController();
const userCommunityController = new UserCommunityController();

export const communityRouter = Router();

communityRouter.get('/', userCommunityController.getUserCommunities);
communityRouter.post('/group', communityController.createGroupCommunity);
communityRouter.get('/:communityId/members', userCommunityController.getCommunityMembers);
communityRouter.post('/:communityId/add/:memberId', userCommunityController.addUserToCommunity);
communityRouter.post('/:communityId/remove/:memberId', userCommunityController.removeUserFromCommunity);
communityRouter.post('/:communityId/promote/:memberId', userCommunityController.promoteUserToAdmin);
communityRouter.post('/:communityId/demote/:memberId', userCommunityController.demoteUserFromAdmin);
communityRouter.post('/friend', communityController.createFriendCommunity);
