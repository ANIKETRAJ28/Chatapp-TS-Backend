import { prisma } from '../config/db.config';
import { ICommunityFriendResponse, ICommunityRequest, ICommunityResponse } from '../interface/community.interface';
import { InternalServerError } from '../util/apiResponse.util';
import { UserRepository } from './user.reposiotry';
import { UserCommunityRepository } from './userCommunity.repository';

export class CommunityRepository {
  private userCommunityRepository: UserCommunityRepository;
  private userRepository: UserRepository;

  constructor() {
    this.userCommunityRepository = new UserCommunityRepository();
    this.userRepository = new UserRepository();
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

  async createFriendCommunity(userId: string, friendId: string): Promise<ICommunityFriendResponse> {
    try {
      const community = await prisma.community.create({ data: { type: 'friend' } });
      await this.userCommunityRepository.createUserGroupCommunity({ userId, communityId: community.id });
      await this.userCommunityRepository.createUserGroupCommunity({ userId: friendId, communityId: community.id });
      const user = await this.userRepository.findUserById(friendId);
      return {
        id: community.id,
        type: community.type,
        friend: user,
        users: 1,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }
}
