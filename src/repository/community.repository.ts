import { prisma } from '../config/db.config';
import { ICommunityRequest, ICommunityResponse } from '../interface/community.interface';
import { InternalServerError } from '../util/apiResponse.util';
import { UserCommunityRepository } from './userCommunity.repository';

export class CommunityRepository {
  private userCommunityRepository: UserCommunityRepository;

  constructor() {
    this.userCommunityRepository = new UserCommunityRepository();
  }

  async createGroupCommunity(data: ICommunityRequest, userId: string): Promise<ICommunityResponse> {
    try {
      const randomId = Math.floor(Math.random() * 53) + 1;
      const avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${randomId}.jpg`;
      const community = await prisma.community.create({ data: { ...data, avatar, type: 'group' } });
      await this.userCommunityRepository.createUserGroupCommunity({ userId, communityId: community.id });
      return community;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async createFriendCommunity(userId: string, friendId: string): Promise<ICommunityResponse> {
    try {
      const community = await prisma.community.create({ data: { type: 'friend' } });
      await this.userCommunityRepository.createUserGroupCommunity({ userId, communityId: community.id });
      await this.userCommunityRepository.createUserGroupCommunity({ userId: friendId, communityId: community.id });
      return community;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }
}
