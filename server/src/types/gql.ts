import type { PubSub } from "graphql-subscriptions";
import type {
  Chat,
  ChatUser,
  Message,
  User,
} from "../../prisma/generated/client/client";

export type GraphQLContext = {
  userId: string | null;
  pubsub: PubSub;
};

export type ChatWithRelations = Chat & {
  members: (ChatUser & { user: User })[];
  messages: Message[];
};

export type MessageWithRelations = Message & {
  author: User;
  chat: Chat;
};
