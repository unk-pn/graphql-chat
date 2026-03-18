import { prisma } from "../../lib/prisma";
import type { GraphQLContext, MessageWithRelations } from "../../types/gql";

export const messageResolvers = {
  Mutation: {
    async markAsRead(
      _: unknown,
      { chatId }: { chatId: string },
      ctx: GraphQLContext,
    ) {
      if (!ctx.userId) throw new Error("Unauthorized");

      const membership = await prisma.chatUser.findUnique({
        where: {
          chatId_userId: { chatId, userId: ctx.userId },
        },
      });

      if (!membership) throw new Error("You are not a member of this chat");

      await prisma.message.updateMany({
        where: {
          chatId,
          authorId: { not: ctx.userId },
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });

      return true;
    },

    async sendMessage(
      _: unknown,
      { chatId, text }: { chatId: string; text: string },
      ctx: GraphQLContext,
    ) {
      if (!ctx.userId) throw new Error("Unauthorized");

      const membership = await prisma.chatUser.findUnique({
        where: {
          chatId_userId: { chatId, userId: ctx.userId },
        },
      });

      if (!membership) throw new Error("You are not a member of this chat");

      const message = await prisma.message.create({
        data: {
          text,
          chatId,
          authorId: ctx.userId,
        },
        include: {
          author: true,
          chat: true,
        },
      });

      ctx.pubsub.publish(`MESSAGE_SENT:${chatId}`, {
        messageSent: message,
      });

      const chat = await prisma.chat.findUnique({
        where: { id: chatId },
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      });

      if (chat) {
        const otherMember = chat.members.find((m) => m.userId !== ctx.userId);

        const senderPayload = {
          ...chat,
          lastMessage: message,
        };

        const receiverPayload = {
          ...chat,
          lastMessage: message,
        };

        ctx.pubsub.publish(`USER_CHATS_UPDATED:${ctx.userId}`, {
          chatUpdated: senderPayload,
        });
        if (otherMember) {
          ctx.pubsub.publish(`USER_CHATS_UPDATED:${otherMember.userId}`, {
            chatUpdated: receiverPayload,
          });
        }
      }

      return message;
    },
  },

  Message: {
    author(parent: MessageWithRelations) {
      return parent.author;
    },
  },
};
