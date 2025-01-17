import { ICommunity } from './community.interface';
import { IMessage } from './message.interface';

export interface ICommunityMessage {
  id: string;
  messageId: string;
  communityId: string;
}

export interface ICommunityMessageResponse {
  id: string;
  message: IMessage;
  community: ICommunity;
}

export interface ICommunityMessageRequest {
  messageId: string;
  communityId: string;
}
