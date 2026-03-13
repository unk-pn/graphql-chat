"use client";

import MessageInput from "@/features/messageInput";
import MessageList from "@/features/messageList";
import {
  GET_MESSAGES,
  MESSAGE_SUBSCRIPTION,
  SEND_MESSAGE,
} from "@/shared/api/queries";
import { Message } from "@/shared/types";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import s from "./ChatWindow.module.scss";

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
  const { data, loading } = useQuery<GetMessageData, { chatId: string }>(
    GET_MESSAGES,
    {
      variables: { chatId },
      skip: !chatId,
    },
  );
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async (text: string) => {
    await sendMessage({
      variables: {
        chatId,
        text,
      },
    });
  };

  useSubscription<MessageSubscriptionData>(MESSAGE_SUBSCRIPTION, {
    variables: { chatId },
    skip: !chatId,
    onData: ({ client, data }) => {
      const newMessage = data.data?.messageSent;
      if (!newMessage) return;

      client.cache.updateQuery<GetMessageData>(
        { query: GET_MESSAGES, variables: { chatId } },
        (prev) => ({
          messages: [...(prev?.messages || []), newMessage],
        }),
      );
    },
  });
  console.log("messages:", data?.messages);

  if (loading) return <p>loading...</p>;

  return (
    <div className={s.chatWindow}>
      <MessageList messages={data?.messages || []} currentUserId="0" />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};
