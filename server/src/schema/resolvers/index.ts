import { merge } from "lodash";
import { authResolvers } from "./auth";
import { chatResolvers } from "./chat";
import { messageResolvers } from "./message";
import { subscriptionResolvers } from "./subscription";

export const resolvers = merge(
  authResolvers,
  chatResolvers,
  messageResolvers,
  subscriptionResolvers,
);
