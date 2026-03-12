"use client";

import { useEffect, useRef } from "react";

import MessageItem from "@/features/messageItem";
import { Message } from "@/shared/types";

import s from "./MessageList.module.scss";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={s.emptyState}>
        <p>Нет сообщений</p>
        <span>Начните общение прямо сейчас</span>
      </div>
    );
  }

  return (
    <div className={s.messageList}>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          content={message.text}
          timestamp={message.createdAt}
          // isOwn={message.author === currentUserId}
          isOwn={message.author === "Me"}
          isRead={message.isRead}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
export { MessageList };
