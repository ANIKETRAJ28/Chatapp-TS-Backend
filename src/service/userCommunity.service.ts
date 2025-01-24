import { ICommunityFriendResponse, ICommunityResponse } from '../interface/community.interface';
import { IUserCommunityResponse } from '../interface/userCommunity.interface';
import { UserCommunityRepository } from '../repository/userCommunity.repository';

export class UserCommunityService {
  private userCommunityRepository: UserCommunityRepository;

  constructor() {
    this.userCommunityRepository = new UserCommunityRepository();
  }

  async addUserToCommunity(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    return this.userCommunityRepository.addUserToCommunity(userId, memberId, communityId);
  }

  async removeUserFromCommunity(
    userId: string,
    memberId: string,
    communityId: string,
  ): Promise<IUserCommunityResponse> {
    return this.userCommunityRepository.removeUserFromCommunity(userId, memberId, communityId);
  }

  async promoteUserToAdmin(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    return this.userCommunityRepository.promoteUserToAdmin(userId, memberId, communityId);
  }

  async demoteUserFromAdmin(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    return this.userCommunityRepository.demoteUserFromAdmin(userId, memberId, communityId);
  }
  async getUserCommunities(userId: string): Promise<(ICommunityResponse | ICommunityFriendResponse)[]> {
    return this.userCommunityRepository.getUserCommunities(userId);
  }

  async getCommunityMembers(communityId: string): Promise<IUserCommunityResponse[]> {
    return this.userCommunityRepository.getCommunityMembers(communityId);
  }
}
