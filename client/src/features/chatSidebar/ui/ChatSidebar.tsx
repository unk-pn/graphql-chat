"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ChatItem } from "@/features/chatItem";
import { AppDispatch, RootState } from "@/store";
import { setSelectedChat } from "@/store/chatSlice";

import s from "./ChatSidebar.module.scss";

const ChatSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");

  const chats = useSelector((state: RootState) => state.chat.chats);
  const selectedChatId = useSelector(
    (state: RootState) => state.chat.selectedChatId,
  );

  const filteredChats = chats.filter((chat) => {
    const name = chat.otherUser
      ? `${chat.otherUser.firstName} ${chat.otherUser.lastName}`.toLowerCase()
      : (chat.name || "").toLowerCase();

    return name.includes(searchQuery.toLowerCase());
  });

  const handleChatClick = (chatId: string) => {
    dispatch(setSelectedChat(chatId));
  };

  return (
    <aside className={s.sidebar}>
      <div className={s.searchWrapper}>
        <input
          type={"text"}
          className={s.searchInput}
          placeholder={"Поиск чатов..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={s.chatList}>
        {filteredChats.map((chat) => (
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
