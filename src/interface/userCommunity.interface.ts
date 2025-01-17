import { IUserResponse } from './user.interface';

export interface IUserCommunity {
  id: string;
  userId: string;
  communityId: string;
  isAdmin: boolean | null;
  isSuperAdmin: boolean | null;
  isDeleted: boolean;
}

export interface IUserCommunityRequest {
  userId: string;
  communityId: string;
}

export interface IUserCommunityResponse {
  id: string;
  user: IUserResponse;
  communityId: string;
  isAdmin: boolean | null;
  isSuperAdmin: boolean | null;
  isDeleted: boolean;
}
