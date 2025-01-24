import { prisma } from '../config/db.config';
import { IMessageRequest, IMessageResponse } from '../interface/message.interface';
import { getIO } from '../socket';
import { InternalServerError, NotFound } from '../util/apiResponse.util';

export class MessageRepository {
  async createMessage(data: IMessageRequest): Promise<IMessageResponse> {
    try {
      const message = await prisma.message.create({
        data,
        include: {
          user: true,
        },
      });
      const io = getIO();
      io.to(data.communityId).emit('message recieved', message);
      return message;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async getMessageById(id: string): Promise<IMessageResponse> {
    try {
      const message = await prisma.message.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
      if (!message) {
        throw new NotFound('Message not found');
      }
      return message;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async getMessagesByCommunityId(communityId: string): Promise<IMessageResponse[]> {
    try {
      const messages = await prisma.message.findMany({
        where: { communityId },
        include: {
          user: true,
        },
      });

      return messages;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async deleteMessage(id: string): Promise<IMessageResponse> {
    try {
      const message = await prisma.message.update({
        where: { id },
        data: { isDeleted: true },
        include: {
          user: true,
        },
      });
      return message;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }
}
