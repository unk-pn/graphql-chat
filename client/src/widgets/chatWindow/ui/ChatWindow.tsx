"use client";

import MessageInput from "@/features/messageInput";
import MessageList from "@/features/messageList";
import { ChatHeader } from "@/features/chatHeader";
import {
  GET_CHATS,
  GET_MESSAGES,
  MARK_AS_READ,
  MESSAGE_SUBSCRIPTION,
  SEND_MESSAGE,
} from "@/shared/api/queries";
import { Message } from "@/shared/types";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import s from "./ChatWindow.module.scss";
import { useEffect, useState } from "react";
import { getCookie } from "@/shared/lib/getCookie";

interface MessageSubscriptionData {
  messageSent: Message;
}

interface GetMessageData {
  messages: Message[];
}

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow = ({ chatId }: ChatWindowProps) => {
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    const token = getCookie("token");
    if (!token) return "";
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.sub || "";
  });

  const { data, loading } = useQuery<GetMessageData, { chatId: string }>(
    GET_MESSAGES,
    {
      variables: { chatId },
      skip: !chatId,
      fetchPolicy: "network-only",
    },
  );
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [markAsRead] = useMutation(MARK_AS_READ);

  useEffect(() => {
    if (chatId) {
      markAsRead({
        variables: { chatId },
        refetchQueries: [{ query: GET_MESSAGES }, { query: GET_CHATS }],
      });
    }
  }, [chatId, markAsRead]);

  const handleSendMessage = async (text: string) => {
    if (!text?.trim()) return;

    await sendMessage({
      variables: {
        chatId,
        text: text.trim(),
      },
    });
  };

  useSubscription<MessageSubscriptionData>(MESSAGE_SUBSCRIPTION, {
    variables: { chatId },
    skip: !chatId,
    onData: ({ client, data }) => {
      const newMessage = data.data?.messageSent;
      if (!newMessage || !newMessage.id) return;

      client.cache.updateQuery<GetMessageData>(
        { query: GET_MESSAGES, variables: { chatId } },
        (prev) => ({
          messages: [...(prev?.messages || []), newMessage],
        }),
      );
    },
  });

  if (loading) return <p>loading...</p>;

  return (
    <div className={s.chatWindow}>
      <ChatHeader chatId={chatId} />
      <MessageList
        messages={data?.messages || []}
        currentUserId={currentUserId}
      />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};
