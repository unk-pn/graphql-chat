import { pubsub } from "../../pubsub";

export const subscriptionResolvers = {
  Subscription: {
    messageSent: {
      subscribe: (_parent: any, args: any) => {
        const chatId = args?.chatId || 'cmmp5ageo0000mqrpnbdo2slk'
        return pubsub.asyncIterator(`MESSAGE_SENT:${chatId}`)
      },
    },
  },
} as any