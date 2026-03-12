export const typeDefs = `
  type Message {
    id: ID!
    text: String!
    author: String!
  }

  type Query {
    messages: [Message]!
  }

  type Mutation {
    sendMessage(author: String!, text: String!): Message!
  }

  type Subscription {
    messageSent: Message!
  }
`