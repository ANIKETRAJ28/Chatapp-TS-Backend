import { IUserResponse } from './user.interface';

export interface IUserCommunity {
  id: string;
  userId: string;
  communityId: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  isDeleted: boolean;
}

export interface IUserCommunityResponse {
  id: string;
  user: IUserResponse;
  communityId: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  isDeleted: boolean;
}
