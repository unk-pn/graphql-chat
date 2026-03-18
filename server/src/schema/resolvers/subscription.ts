import { pubsub } from "../../pubsub";
import type { GraphQLContext } from "../../types/gql";

export const subscriptionResolvers = {
  Subscription: {
    messageSent: {
      subscribe: (_parent: any, args: any) => {
        const chatId = args?.chatId;
        return pubsub.asyncIterator(`MESSAGE_SENT:${chatId}`);
      },
    },
    chatUpdated: {
      subscribe: (_: unknown, __: unknown, ctx: GraphQLContext) => {
        if (!ctx.userId) throw new Error("Unauthorized");
        return pubsub.asyncIterator(`USER_CHATS_UPDATED:${ctx.userId}`);
      },
    },
  },
} as any;
