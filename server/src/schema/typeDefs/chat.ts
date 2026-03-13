export const chatTypeDefs = `
  type Chat {
    id: ID!
    otherUser: User!
    lastMessage: Message
    unreadCount: Int!
    messages: [Message!]!
  }

  type Query {
    chats: [Chat!]!
    messages(chatId: ID!): [Message!]!
    searchUsers(query: String!): [User!]!
    me: User
  }
`;
