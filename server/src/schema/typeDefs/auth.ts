export const authTypeDefs = `
  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    register(username: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    createChat(userId: ID!): Chat!
    sendMessage(chatId: ID!, content: String!): Message!
  }
`;
