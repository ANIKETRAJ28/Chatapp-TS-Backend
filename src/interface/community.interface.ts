import { TCommunity } from '../types/community.types';

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

export interface ICommunityRequest {
  name: string | null;
  description: string | null;
}
