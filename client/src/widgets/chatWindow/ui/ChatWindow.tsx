"use client";

import { useSelector } from "react-redux";

import ChatHeader from "@/features/chatHeader";
import MessageInput from "@/features/messageInput";
import MessageList from "@/features/messageList";
import { RootState } from "@/store";

import s from "./ChatWindow.module.scss";

const ChatWindow = () => {
  const selectedChatId = useSelector(
    (state: RootState) => state.chat.selectedChatId,
  );
  const chats = useSelector((state: RootState) => state.chat.chats);
  const messages = useSelector((state: RootState) =>
    selectedChatId ? state.chat.messages[selectedChatId] || [] : [],
  );
  const currentUserId = "0";

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  if (!selectedChatId || !selectedChat) {
    return (
      <div className={s.placeholder}>Выберите чат, чтобы начать общение</div>
    );
  }

  const chatName =
    selectedChat.type === "private" && selectedChat.otherUser
      ? `${selectedChat.otherUser.firstName} ${selectedChat.otherUser.lastName}`
      : selectedChat.name || "Чат";

  const handleSendMessage = (content: string) => {
    console.log("Отправка сообщения:", content);
  };

  return (
    <div className={s.chatWindow}>
      <ChatHeader
        name={chatName}
        avatar={selectedChat.otherUser?.avatarUrl || selectedChat.avatarUrl}
        isOnline={selectedChat.otherUser?.isOnline || false}
      />

      <MessageList messages={messages} currentUserId={currentUserId} />

      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
export { ChatWindow };
