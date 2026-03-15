import { pubsub } from "../../pubsub";

export const subscriptionResolvers = {
  Subscription: {
    messageSent: {
      subscribe: (_parent: any, args: any) => {
        const chatId = args?.chatId;
        return pubsub.asyncIterator(`MESSAGE_SENT:${chatId}`);
      },
    },
  },
} as any;
