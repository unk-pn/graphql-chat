import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Chat, Message } from "@/shared/types";
import { gql } from "@apollo/client";

interface ChatState {
  chats: Chat[];
  selectedChatId: string | null;
  messages: Record<string, Message[]>;
}

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
  messages: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: () => ({ data: null as unknown }),
  endpoints: (builder) => ({
    getChats: builder.query<{ chats: Chat[] }, void>({
      query: () => ({
        document: gql`
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
        `,
      }),
    }),
  }),
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
