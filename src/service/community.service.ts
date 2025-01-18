import { ICommunityRequest, ICommunityResponse } from '../interface/community.interface';
import { CommunityRepository } from '../repository/community.repository';

export class CommunityService {
  private communityRepository: CommunityRepository;

  constructor() {
    this.communityRepository = new CommunityRepository();
  }

  async createGroupCommunity(data: ICommunityRequest, userId: string): Promise<ICommunityResponse> {
    return this.communityRepository.createGroupCommunity(data, userId);
  }

  async createFriendCommunity(userId: string, friendId: string): Promise<ICommunityResponse> {
    return this.communityRepository.createFriendCommunity(userId, friendId);
  }
}
