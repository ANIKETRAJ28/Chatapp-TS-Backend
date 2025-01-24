import { TCommunity } from '../types/community.types';
import { IUserResponse } from './user.interface';

export interface ICommunity {
  id: string;
  name: string | null;
  description: string | null;
  avatar: string | null;
  type: TCommunity;
}

export interface ICommunityResponse {
  id: string;
  name: string | null;
  description: string | null;
  avatar: string | null;
  type: TCommunity;
  users?: number;
}

export interface ICommunityFriendResponse {
  id: string;
  type: TCommunity;
  friend: IUserResponse;
  users?: number;
}

export interface ICommunityRequest {
  name: string | null;
  description: string | null;
}
