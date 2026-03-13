import { authTypeDefs } from "./auth";
import { chatTypeDefs } from "./chat";
import { messageTypeDefs } from "./message";
import { subscriptionTypeDefs } from "./subscription";
import { userTypeDefs } from "./user";

export const typeDefs = [
  userTypeDefs,
  authTypeDefs,
  chatTypeDefs,
  messageTypeDefs,
  subscriptionTypeDefs,
];
