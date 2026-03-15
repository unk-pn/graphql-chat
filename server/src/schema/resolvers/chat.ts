import { prisma } from "../../lib/prisma";
import type { ChatWithRelations, GraphQLContext } from "../../types/gql";

export const chatResolvers = {
  Query: {
    async searchUsers(
      _: unknown,
      { query }: { query: string },
      ctx: GraphQLContext,
    ) {
      if (!ctx.userId) throw new Error("Unauthorized");

      return prisma.user.findMany({
        where: {
          username: {
            contains: query,
            mode: "insensitive",
          },
          id: { not: ctx.userId },
        },
        take: 10,
      });
    },

    async chats(_: unknown, __: unknown, ctx: GraphQLContext) {
      if (!ctx.userId) throw new Error("Unauthorized");

      const chats = await prisma.chat.findMany({
        where: {
          members: { some: { userId: ctx.userId } },
        },
        include: {
          members: {
            include: { user: true },
          },
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
            include: { author: true },
          },
        },
      });

      return chats.map((chat: any) => ({
        ...chat,
        otherUser: chat.members.find((m: any) => m.userId !== ctx.userId)?.user,
        lastMessage: chat.messages[0] || null,
        unreadCount: 0,
      }));
    },

    async messages(
      _: unknown,
      { chatId }: { chatId: string },
      ctx: GraphQLContext,
    ) {
      if (!ctx.userId) throw new Error("Unauthorized");

      return prisma.message.findMany({
        where: { chatId },
        orderBy: { createdAt: "asc" },
        include: { author: true },
      });
    },
  },

  Mutation: {
    createChat: async (
      _: unknown,
      { userId }: { userId: string },
      ctx: GraphQLContext,
    ) => {
      if (!ctx.userId) throw new Error("Unauthorized");

      if (ctx.userId === userId)
        throw new Error("Cannot send message to yourself");

      const existing = await prisma.chat.findFirst({
        where: {
          members: {
            every: {
              OR: [{ userId: ctx.userId }, { userId }],
            },
          },
        },
        include: {
          members: {
            include: { user: true },
          },
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
            include: { author: true },
          },
        },
      });

      if (existing) {
        return {
          ...existing,
          otherUser: existing.members.find((m: any) => m.userId !== ctx.userId)
            ?.user,
          lastMessage: existing.messages[0] || null,
          unreadCount: 0,
        };
      }

      const chat = await prisma.chat.create({
        data: {
          members: {
            create: [{ userId: ctx.userId }, { userId }],
          },
        },
        include: {
          members: {
            include: { user: true },
          },
          messages: {
            take: 1,
            orderBy: { createdAt: "desc" },
            include: { author: true },
          },
        },
      });

      return {
        ...chat,
        otherUser: chat.members.find((m: any) => m.userId !== ctx.userId)?.user,
        lastMessage: chat.messages[0] || null,
        unreadCount: 0,
      };
    },

    async sendMessage(
      _: unknown,
      { chatId, text }: { chatId: string; text: string },
      ctx: GraphQLContext,
    ) {
      if (!ctx.userId) throw new Error("Unauthorized");

      const message = await prisma.message.create({
        data: {
          chatId,
          text,
          authorId: ctx.userId,
        },
        include: {
          author: {
            select: { id: true, username: true },
          },
        },
      });

      return message;
    },
  },

  Chat: {
    async otherUser(
      parent: ChatWithRelations,
      _: unknown,
      ctx: GraphQLContext,
    ) {
      if (!ctx.userId) throw new Error("Unauthorized");

      const chatUser = parent.members.find((m) => m.userId !== ctx.userId);

      return chatUser ? chatUser.user : null;
    },

    async messages(parent: ChatWithRelations) {
      return prisma.message.findMany({
        where: { chatId: parent.id },
        orderBy: { createdAt: "asc" },
      });
    },

    async unreadCount(
      parent: ChatWithRelations,
      _: unknown,
      ctx: GraphQLContext,
    ): Promise<number> {
      if (!ctx.userId) throw new Error("Unauthorized");

      return prisma.message.count({
        where: {
          chatId: parent.id,
          authorId: { not: ctx.userId },
          isRead: false,
        },
      });
    },
  },
};
