import { prisma } from "../../lib/prisma";
import type { ChatWithRelations, GraphQLContext } from "../../types/gql";

export const chatResolvers = {
  Query: {
    async chats(_: unknown, __: unknown, ctx: GraphQLContext) {
      if (!ctx.userId) throw new Error("Unauthorized");

      return prisma.chat.findMany({
        where: {
          members: {
            some: { userId: ctx.userId },
          },
        },
        include: {
          members: {
            include: { user: true },
          },
          messages: true,
        },
      });
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
      });

      if (existing) return existing;

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
          messages: true,
        },
      });

      return chat;
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
