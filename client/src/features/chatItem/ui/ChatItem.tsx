"use client";

import { Chat } from "@/shared/types";

import s from "./ChatItem.module.scss";

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const ChatItem = ({ chat, isSelected, onClick }: ChatItemProps) => {
  // Получаем имя и аватар в зависимости от типа чата
  const recipientName = chat.otherUser
    ? `${chat.otherUser.firstName} ${chat.otherUser.lastName}`
    : chat.name || "Чат";

  const recipientAvatar = chat.otherUser?.avatarUrl || chat.avatarUrl;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2);
  };

  // Форматируем время последнего сообщения
  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
  };

  return (
    <div
      className={`${s.chatItem} ${isSelected ? s.selected : ""}`}
      onClick={onClick}
    >
      <div className={s.avatar}>
        {recipientAvatar ? (
          <img src={recipientAvatar} alt={recipientName} />
        ) : (
          <span className={s.avatarPlaceholder}>
            {getInitials(recipientName)}
          </span>
        )}
      </div>

      <div className={s.content}>
        <div className={s.header}>
          <span className={s.name}>{recipientName}</span>
          {chat.lastMessage?.createdAt && (
            <span className={s.time}>
              {formatTime(chat.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <div className={s.footer}>
          <span className={s.lastMessage}>
            {chat.lastMessage?.content || "Нет сообщений"}
          </span>
          {chat.unreadCount > 0 && (
            <span className={s.unreadBadge}>{chat.unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
export { ChatItem };
