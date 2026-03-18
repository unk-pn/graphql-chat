"use client";

import { Chat, User } from "@/shared/types";

import s from "./ChatItem.module.scss";

interface ChatItemProps {
  chat?: Chat; // optional
  user?: User; // для поиска
  isSelected?: boolean;
  onClick?: () => void;
}

const ChatItem = ({ chat, user, isSelected, onClick }: ChatItemProps) => {
  const recipientName =
    user?.username || chat?.otherUser?.username || chat?.name || "Чат";

  const recipientAvatar =
    user?.avatarUrl || chat?.otherUser?.avatarUrl || chat?.avatarUrl;

  const isOnline = chat?.otherUser?.isOnline || user?.isOnline || false;

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
    const parsed = Number(dateStr);
    const date = isNaN(parsed) ? new Date(dateStr) : new Date(parsed);
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
      <div className={s.avatarWrapper}>
        <div className={s.avatar}>
          {recipientAvatar ? (
            <img src={recipientAvatar} alt={recipientName} />
          ) : (
            <span className={s.avatarPlaceholder}>
              {getInitials(recipientName)}
            </span>
          )}
          {isOnline && <span className={s.onlineIndicator} />}
        </div>
      </div>

      <div className={s.content}>
        <div className={s.header}>
          <span className={s.name}>{recipientName}</span>
          {/* время только для чатов */}
          {chat?.lastMessage?.createdAt && (
            <span className={s.time}>
              {formatTime(chat.lastMessage.createdAt)}
            </span>
          )}
        </div>

        <div className={s.footer}>
          {user ? (
            <span className={s.createChatLabel}>Создать чат</span>
          ) : (
            <>
              <span className={s.lastMessage}>
                {chat?.lastMessage?.text || "Нет сообщений"}
              </span>
              {chat && chat.unreadCount > 0 && (
                <span className={s.unreadBadge}>{chat?.unreadCount}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
export { ChatItem };
