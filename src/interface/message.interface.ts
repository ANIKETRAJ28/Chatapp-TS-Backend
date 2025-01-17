import { TMessage } from '../types/message.types';
import { IUserResponse } from './user.interface';

export interface IMessage {
  id: string;
  content: string;
  type: TMessage;
  timestamp: Date;
  communityId: string;
  userId: string;
}

export interface IMessageRequest {
  content: string;
  type: TMessage;
  communityId: string;
}

export interface IMessageResponse {
  id: string;
  content: string;
  type: TMessage;
  timestamp: Date;
  community: string;
  user: IUserResponse;
}
