"use client";

import s from "./MessageItem.module.scss";

interface MessageItemProps {
  content: string;
  timestamp: string;
  isOwn: boolean;
  isRead?: boolean;
}

const MessageItem = ({
  content,
  timestamp,
  isOwn,
  isRead,
}: MessageItemProps) => {
  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "";
    const timestamp = Number(dateStr);
    const date = isNaN(timestamp) ? new Date(dateStr) : new Date(timestamp);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`${s.messageWrapper} ${isOwn ? s.own : s.other}`}>
      <div className={`${s.message} ${isOwn ? s.ownMessage : s.otherMessage}`}>
        <p className={s.content}>{content}</p>
        <div className={s.meta}>
          <span className={s.time} suppressHydrationWarning>
            {formatTime(timestamp)}
          </span>
          {isOwn && (
            <span className={s.status}>
              {isRead ? <DoubleCheckIcon /> : <SingleCheckIcon />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const SingleCheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DoubleCheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="18 6 7 17 2 12" />
    <polyline points="22 6 11 17" />
  </svg>
);

export default MessageItem;
export { MessageItem };
