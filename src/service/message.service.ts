import { ICommunityFriendResponse } from '../interface/community.interface';
import { IMessageRequest, IMessageResponse } from '../interface/message.interface';
import { MessageRepository } from '../repository/message.repository';

export class MessageService {
  private messageRepository: MessageRepository;

  constructor() {
    this.messageRepository = new MessageRepository();
  }

  async createMessage(
    data: IMessageRequest & { communityType: string | undefined },
  ): Promise<IMessageResponse | ({ community: ICommunityFriendResponse } & { message: IMessageResponse })> {
    if (data.communityType)
      return this.messageRepository.cretaeMessageAndCommunity(data as IMessageRequest & { communityType: string });
    return this.messageRepository.createMessage(data);
  }

  async getMessageById(id: string): Promise<IMessageResponse> {
    return this.messageRepository.getMessageById(id);
  }

  async getMessageByCommunityId(id: string): Promise<IMessageResponse[]> {
    return this.messageRepository.getMessagesByCommunityId(id);
  }

  async deleteMessage(id: string): Promise<IMessageResponse> {
    return this.messageRepository.deleteMessage(id);
  }
}
