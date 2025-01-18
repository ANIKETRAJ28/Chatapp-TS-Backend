import { ICommunityResponse } from '../interface/community.interface';
import { IUserResponse } from '../interface/user.interface';
import { IUserCommunity, IUserCommunityRequest, IUserCommunityResponse } from '../interface/userCommunity.interface';
import { UserCommunityRepository } from '../repository/userCommunity.repository';

export class UserCommunityService {
  private userCommunityRepository: UserCommunityRepository;

  constructor() {
    this.userCommunityRepository = new UserCommunityRepository();
  }

  async createUserGroupCommunity(data: IUserCommunityRequest): Promise<IUserCommunity> {
    return this.userCommunityRepository.createUserGroupCommunity(data);
  }

  async createUserFriendCommunity(data: IUserCommunityRequest): Promise<IUserCommunity> {
    return this.userCommunityRepository.createUserFriendCommunity(data);
  }

  async addUserToCommunity(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    return this.userCommunityRepository.addUserToCommunity(userId, memberId, communityId);
  }

  async promoteUserToAdmin(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    return this.userCommunityRepository.promoteUserToAdmin(userId, memberId, communityId);
  }

  async demoteUserFromAdmin(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    return this.userCommunityRepository.demoteUserFromAdmin(userId, memberId, communityId);
  }
  async getUserCommunities(userId: string): Promise<ICommunityResponse[]> {
    return this.userCommunityRepository.getUserCommunities(userId);
  }

  async getCommunityMembers(communityId: string): Promise<IUserResponse[]> {
    return this.userCommunityRepository.getCommunityMembers(communityId);
  }
}
