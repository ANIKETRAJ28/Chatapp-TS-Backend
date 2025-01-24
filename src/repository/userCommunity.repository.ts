import { prisma } from '../config/db.config';
import { ICommunityFriendResponse, ICommunityResponse } from '../interface/community.interface';
import { IUserCommunity, IUserCommunityRequest, IUserCommunityResponse } from '../interface/userCommunity.interface';
import { BadRequest, InternalServerError } from '../util/apiResponse.util';

export class UserCommunityRepository {
  async createUserGroupCommunity(data: IUserCommunityRequest): Promise<IUserCommunity> {
    try {
      const userCommunity = await prisma.userCommunity.create({
        data: { ...data, isAdmin: true, isSuperAdmin: true },
        include: { user: true },
      });
      return userCommunity;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async createUserFriendCommunity(data: IUserCommunityRequest): Promise<IUserCommunity> {
    try {
      const userCommunity = await prisma.userCommunity.create({ data });
      return userCommunity;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async addUserToCommunity(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    try {
      const userCommunity = await prisma.userCommunity.findUnique({
        where: { userId_communityId: { userId, communityId }, isDeleted: false },
      });
      if (!userCommunity) {
        throw new BadRequest('User is not a member of this group');
      }
      if (!userCommunity.isAdmin) {
        throw new BadRequest('User is not an admin');
      }
      const memberCommunity = await prisma.userCommunity.update({
        where: { userId_communityId: { userId: memberId, communityId }, isDeleted: true },
        data: {
          isDeleted: false,
        },
        include: {
          user: true,
        },
      });
      if (memberCommunity) return memberCommunity;
      const createdCommunity = await prisma.userCommunity.create({
        data: {
          userId: memberId,
          communityId: userCommunity.communityId,
          isAdmin: false,
          isSuperAdmin: false,
        },
        include: {
          user: true,
        },
      });
      return {
        id: createdCommunity.id,
        communityId: createdCommunity.communityId,
        isAdmin: createdCommunity.isAdmin,
        isDeleted: createdCommunity.isDeleted,
        isSuperAdmin: createdCommunity.isSuperAdmin,
        user: {
          id: createdCommunity.user.id,
          name: createdCommunity.user.name,
          email: createdCommunity.user.email,
          username: createdCommunity.user.username,
          avatar: createdCommunity.user.avatar,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async removeUserFromCommunity(
    userId: string,
    memberId: string,
    communityId: string,
  ): Promise<IUserCommunityResponse> {
    try {
      const userCommunity = await prisma.userCommunity.findUnique({
        where: { userId_communityId: { userId, communityId }, isDeleted: false },
      });
      if (!userCommunity) {
        throw new BadRequest('User is not a member of this group');
      }
      if (!userCommunity.isAdmin) {
        throw new BadRequest('User is not an admin');
      }
      const memberCommunity = await prisma.userCommunity.findUnique({
        where: { userId_communityId: { userId: memberId, communityId } },
      });
      if (!memberCommunity) {
        throw new BadRequest('Member is not a member of this group');
      }
      if (memberCommunity.isSuperAdmin) {
        throw new BadRequest('Member is super admin of this group');
      }
      const deletedCommunity = await prisma.userCommunity.update({
        where: { id: memberCommunity.id },
        data: {
          isDeleted: true,
          isAdmin: false,
          isSuperAdmin: false,
        },
        include: {
          user: true,
        },
      });
      return {
        id: deletedCommunity.id,
        communityId: deletedCommunity.communityId,
        isAdmin: deletedCommunity.isAdmin,
        isDeleted: deletedCommunity.isDeleted,
        isSuperAdmin: deletedCommunity.isSuperAdmin,
        user: {
          id: deletedCommunity.user.id,
          name: deletedCommunity.user.name,
          email: deletedCommunity.user.email,
          username: deletedCommunity.user.username,
          avatar: deletedCommunity.user.avatar,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async promoteUserToAdmin(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    try {
      const userCommunity = await prisma.userCommunity.findUnique({
        where: { userId_communityId: { userId, communityId }, isDeleted: false },
      });
      if (!userCommunity) throw new BadRequest('User doesnot belogn to the group');
      if (!userCommunity.isAdmin) throw new BadRequest('User is not admin of thew group');
      const memberCommunity = await prisma.userCommunity.findUnique({
        where: { userId_communityId: { userId: memberId, communityId }, isDeleted: false },
      });
      if (!memberCommunity) throw new BadRequest('Member is not in the group');
      if (memberCommunity.isAdmin) throw new BadRequest('Member is an admin of the group');
      if (memberCommunity.isSuperAdmin) throw new BadRequest('Member is super admin of the group');
      const promotedUserCommunity = await prisma.userCommunity.update({
        where: { id: memberCommunity.id },
        data: { isAdmin: true },
        include: { user: true },
      });
      return {
        id: promotedUserCommunity.id,
        communityId: promotedUserCommunity.communityId,
        isAdmin: promotedUserCommunity.isAdmin,
        isDeleted: promotedUserCommunity.isDeleted,
        isSuperAdmin: promotedUserCommunity.isSuperAdmin,
        user: {
          id: promotedUserCommunity.user.id,
          name: promotedUserCommunity.user.name,
          email: promotedUserCommunity.user.email,
          username: promotedUserCommunity.user.username,
          avatar: promotedUserCommunity.user.avatar,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async demoteUserFromAdmin(userId: string, memberId: string, communityId: string): Promise<IUserCommunityResponse> {
    try {
      const userCommunity = await prisma.userCommunity.findUnique({
        where: { userId_communityId: { userId, communityId }, isDeleted: false },
      });
      if (!userCommunity) throw new BadRequest('User doesnot belogn to the group');
      if (!userCommunity.isAdmin) throw new BadRequest('User is not admin of thew group');
      const memberCommunity = await prisma.userCommunity.findUnique({
        where: { userId_communityId: { userId: memberId, communityId }, isDeleted: false },
      });
      if (!memberCommunity) throw new BadRequest('Member is not in the group');
      if (memberCommunity.isSuperAdmin) throw new BadRequest('Member is super admin of the group');
      if (!memberCommunity.isAdmin) throw new BadRequest('Member is not an admin of the group');
      const demotedUserCommunity = await prisma.userCommunity.update({
        where: { id: memberCommunity.id },
        data: { isAdmin: false },
        include: { user: true },
      });
      return {
        id: demotedUserCommunity.id,
        communityId: demotedUserCommunity.communityId,
        isAdmin: demotedUserCommunity.isAdmin,
        isDeleted: demotedUserCommunity.isDeleted,
        isSuperAdmin: demotedUserCommunity.isSuperAdmin,
        user: {
          id: demotedUserCommunity.user.id,
          name: demotedUserCommunity.user.name,
          email: demotedUserCommunity.user.email,
          username: demotedUserCommunity.user.username,
          avatar: demotedUserCommunity.user.avatar,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async getUserCommunities(userId: string): Promise<(ICommunityResponse | ICommunityFriendResponse)[]> {
    try {
      const userCommunities = await prisma.userCommunity.findMany({ where: { userId, isDeleted: false } });
      const communities = await Promise.all(
        userCommunities.map(
          async (usrCommunity: {
            communityId: string;
            id: string;
            userId: string;
            isAdmin: boolean | null;
            isSuperAdmin: boolean | null;
            isDeleted: boolean;
          }) =>
            prisma.community.findUnique({
              where: { id: usrCommunity.communityId },
              include: {
                _count: {
                  select: { users: true },
                },
              },
            }),
        ),
      );
      const allCommunities = communities
        .filter((community) => community !== null)
        .map((community): ICommunityResponse => {
          return {
            id: community.id,
            name: community.name,
            description: community.description,
            avatar: community.avatar,
            type: community.type,
            users: community._count.users,
          };
        });
      const resolvedCommunities = await Promise.all(
        allCommunities.map(async (community) => {
          if (community.type === 'friend') {
            const communityWithMembers = await this.getCommunityMembers(community.id);
            const members = communityWithMembers.map((community) => community.user);
            const friends = members.filter((member) => member.id !== userId);
            return {
              id: community.id,
              type: community.type,
              friend: friends[0],
              users: community.users,
            };
          }
          return community;
        }),
      );
      return resolvedCommunities;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }

  async getCommunityMembers(communityId: string): Promise<IUserCommunityResponse[]> {
    try {
      const userCommunities = await prisma.userCommunity.findMany({
        where: {
          communityId,
          isDeleted: false,
        },
        include: {
          user: true,
        },
      });
      const users = userCommunities.map((user) => {
        return {
          id: user.id,
          userId: user.userId,
          communityId: user.communityId,
          isAdmin: user.isAdmin,
          isSuperAdmin: user.isSuperAdmin,
          isDeleted: user.isDeleted,
          user: {
            id: user.user.id,
            name: user.user.name,
            username: user.user.username,
            email: user.user.email,
            avatar: user.user.avatar,
          },
        };
      });
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError('An unknown error occurred', error);
      }
    }
  }
}
