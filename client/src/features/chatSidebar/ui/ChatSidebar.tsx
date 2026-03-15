"use client";

import { useState } from "react";
import { ChatItem } from "@/features/chatItem";
import { setSelectedChat } from "@/store/chatSlice";
import s from "./ChatSidebar.module.scss";
import { CREATE_CHAT, GET_CHATS, SEARCH_USERS } from "@/shared/api/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { Chat, User } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/shared/store";

interface GetChatsData {
  chats: Chat[];
}

interface SearchUsersData {
  searchUsers: User[];
}

const ChatSidebar = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsers, { data: searchResults }] =
    useLazyQuery<SearchUsersData>(SEARCH_USERS);

  const { data, loading } = useQuery<GetChatsData>(GET_CHATS);
  const chats = data?.chats || [];

  const selectedChatId = useAppSelector(
    (state) => state.chat.selectedChatId,
  );

  const filteredChats = chats.filter((chat) => {
    const name = chat.otherUser
      ? `${chat.otherUser.username}`
      : (chat.name || "").toLowerCase();

    return name.includes(searchQuery.toLowerCase());
  });

  const [createChat] = useMutation(CREATE_CHAT, {
    refetchQueries: [{ query: GET_CHATS }],
  });

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
                onClick={() => createChat({ variables: { userId: user.id } })}
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
