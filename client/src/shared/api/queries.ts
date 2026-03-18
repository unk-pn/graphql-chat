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
        isOnline
        lastSeen
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

export const SEARCH_USERS = gql`
  query searchUsers($query: String!) {
    searchUsers(query: $query) {
      id
      username
      avatarUrl
        isOnline
    }
  }
`;

export const MARK_AS_READ = gql`
  mutation markAsRead($chatId: ID!) {
    markAsRead(chatId: $chatId)
  }
`;

// Mutations
export const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!, $chatId: ID!) {
    sendMessage(text: $text, chatId: $chatId) {
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        avatarUrl
        isOnline
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
        isOnline
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($userId: ID!) {
    createChat(userId: $userId) {
      id
      otherUser {
        id
        username
        avatarUrl
        isOnline
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

// Subscriptions
export const MESSAGE_SUBSCRIPTION = gql`
  subscription messageSent($chatId: ID!) {
    messageSent(chatId: $chatId) {
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

export const CHAT_UPDATED_SUBSCRIPTION = gql`
  subscription chatUpdated {
    chatUpdated {
      id
      otherUser {
        id
        username
        avatarUrl
        isOnline
        lastSeen
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
`
