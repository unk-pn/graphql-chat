import { gql } from "@apollo/client";

// Queries
export const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      text
      author
    }
  }
`;

// Mutations
export const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!, $author: String!) {
    sendMessage(text: $text, author: $author) {
      id
      text
      author
    }
  }
`;

// Subscriptions
export const MESSAGE_SENT = gql`
  subscription messageSent {
    messageSent {
      id
      text
      author
    }
  }
`;
