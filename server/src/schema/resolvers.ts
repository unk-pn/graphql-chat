import { pubsub } from "../pubsub";

type MessageType = {
  id: string;
  text: string;
  author: string;
};

const messages: MessageType[] = [];

export const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    sendMessage: (
      _: unknown,
      { author, text }: { author: string; text: string },
    ) => {
      const message: MessageType = { id: Date.now().toString(), text, author };
      messages.push(message);
      pubsub.publish("MESSAGE_SENT", { messageSent: message });
      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterableIterator("MESSAGE_SENT"),
    },
  },
};
