export const messageTypeDefs = `
  type Message {
    id: ID!
    text: String
    authorId: ID!
    author: User
    timestamp: String
    chatId: ID!
    createdAt: String
    isRead: Boolean
  }
  
  type Mutation {
    sendMessage(chatId: ID!, text: String!): Message!
    markAsRead(chatId: ID!): Boolean!
  }

  type Subscription {
    messageSent(chatId: ID!): Message!
  }
`;
