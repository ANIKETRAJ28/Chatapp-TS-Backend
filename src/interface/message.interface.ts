import { TMessage } from '../types/message.types';
import { IUserResponse } from './user.interface';

export interface IMessage {
  id: string;
  content: string;
  type: TMessage;
  timestamp: Date;
  communityId: string;
  userId: string;
  isDeleted: boolean;
}

export interface IMessageRequest {
  content: string;
  type: TMessage;
  communityId: string;
  userId: string;
}

export interface IMessageResponse {
  id: string;
  content: string;
  type: TMessage;
  timestamp: Date;
  communityId: string;
  isDeleted: boolean;
  user: IUserResponse;
}
