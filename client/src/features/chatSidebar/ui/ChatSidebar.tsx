"use client";

import { useEffect, useState } from "react";
import { ChatItem } from "@/features/chatItem";
import { setSelectedChat } from "@/store/chatSlice";
import s from "./ChatSidebar.module.scss";
import {
  CHAT_UPDATED_SUBSCRIPTION,
  CREATE_CHAT,
  GET_CHATS,
  SEARCH_USERS,
} from "@/shared/api/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { Chat, User } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/shared/store";

interface GetChatsData {
  chats: Chat[];
}

interface SearchUsersData {
  searchUsers: User[];
}

interface ChatUpdatedSubscriptionData {
  chatUpdated: Chat;
}

interface CreateChatMutationData {
  createChat: Chat;
}

const ChatSidebar = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsers, { data: searchResults }] =
    useLazyQuery<SearchUsersData>(SEARCH_USERS);

  const { data, loading, subscribeToMore } = useQuery<GetChatsData>(GET_CHATS);
  const chats = data?.chats || [];

  const selectedChatId = useAppSelector((state) => state.chat.selectedChatId);

  const filteredChats = chats.filter((chat) => {
    const name = chat.otherUser
      ? `${chat.otherUser.username}`
      : (chat.name || "").toLowerCase();

    return name.includes(searchQuery.toLowerCase());
  });

  const [createChat] = useMutation<CreateChatMutationData>(CREATE_CHAT, {
    refetchQueries: [{ query: GET_CHATS }],
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore<ChatUpdatedSubscriptionData>({
      document: CHAT_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data || !prev.chats) return prev as GetChatsData;
        const updatedChat = subscriptionData.data.chatUpdated;

        const exists = prev.chats.find((c) =>
          c.id === updatedChat.id ? updatedChat : c,
        );

        if (exists) {
          const newChats = prev.chats.map((c) =>
            c.id === updatedChat.id ? updatedChat : c,
          );
          return { chats: newChats } as GetChatsData;
        } else {
          return { chats: [updatedChat, ...prev.chats] } as GetChatsData;
        }
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  const handleCreateChat = async (userId: string) => {
    try {
      const { data } = await createChat({ variables: { userId } });
      if (data?.createChat) {
        dispatch(setSelectedChat(data.createChat.id));
        setSearchQuery("");
      }
    } catch (error) {
      console.log("Error creating chat: ", error);
    }
  };

  const handleChatClick = (chatId: string) => {
    dispatch(setSelectedChat(chatId));
  };

  if (loading) return <div className={s.loading}>Загрузка чатов...</div>;

  return (
    <aside className={s.sidebar}>
      <div className={s.searchWrapper}>
        <input
          type={"text"}
          className={s.searchInput}
          placeholder={"Поиск чатов..."}
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
            if (value.length > 2) searchUsers({ variables: { query: value } });
          }}
        />
      </div>

      <div className={s.chatList}>
        {searchQuery.length > 2 && searchResults?.searchUsers
          ? searchResults.searchUsers.map((user) => (
              <ChatItem
                key={user.id}
                user={user}
                // onClick={() => createChat({ variables: { userId: user.id } })}
                onClick={() => handleCreateChat(user.id)}
              />
            ))
          : filteredChats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isSelected={selectedChatId === chat.id}
                onClick={() => handleChatClick(chat.id)}
              />
            ))}

        {filteredChats.length === 0 && (
          <div className={s.emptyState}>
            <p>Чаты не найдены</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
export { ChatSidebar };
