export const subscriptionTypeDefs = `
  type Subscription {
    messageSent(chatId: ID!): Message!
  }
`;