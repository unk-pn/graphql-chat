import { merge } from "lodash";
import { authResolvers } from "./auth";
import { chatResolvers } from "./chat";
import { messageResolvers } from "./message";
import { subscriptionResolvers } from "./subscription";
import { userResolver } from "./user";

export const resolvers = merge(
  authResolvers,
  chatResolvers,
  messageResolvers,
  subscriptionResolvers,
  userResolver,
);
