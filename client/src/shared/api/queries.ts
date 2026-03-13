import { gql } from "@apollo/client";

// Queries
export const GET_CHATS = gql`
  query GetChats {
    chats {
      id
      otherUser {
        id
        username
        avatarUrl
      }
      unreadCount
      lastMessage {
        id
        text
        author {
          id
          username
        }
        createdAt
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      text
      author {
        id
        username
      }
      createdAt
    }
  }
`;

// Mutations
export const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!, $chatId: ID!) {
    sendMessage(text: $text, chatId: $chatId) {
      id
      text
      author {
        username
      }
      createdAt
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
      user {
        id
        username
        avatarUrl
      }
    }
  }
`;

// Subscriptions
export const MESSAGE_SUBSCRIPTION = gql`
  subscription messageSent($chatId: ID!) {
    messageSent(chatId: $chatId) {
      id
      text
      author {
        username
      }
      createdAt
    }
  }
`;
