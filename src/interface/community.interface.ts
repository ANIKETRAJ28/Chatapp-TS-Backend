import { TCommunity } from '../types/community.types';
import { IUserResponse } from './user.interface';

export interface ICommunity {
  id: string;
  name: string;
  description: string;
  avatar: string;
  type: TCommunity;
}

export interface ICommunityResponse {
  id: string;
  name: string;
  description: string;
  avatar: string;
  type: TCommunity;
  users: IUserResponse[];
}

export interface ICommunityRequest {
  name: string;
  description: string;
  avatar: string;
  type: TCommunity;
}
