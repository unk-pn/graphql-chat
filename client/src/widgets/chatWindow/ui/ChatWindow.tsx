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

// import { useSelector } from "react-redux";

// import ChatHeader from "@/features/chatHeader";
// import MessageInput from "@/features/messageInput";
// import MessageList from "@/features/messageList";
// import { RootState } from "@/store";


// const ChatWindow = () => {
//   const selectedChatId = useSelector(
//     (state: RootState) => state.chat.selectedChatId,
//   );
//   const chats = useSelector((state: RootState) => state.chat.chats);
//   const messages = useSelector((state: RootState) =>
//     selectedChatId ? state.chat.messages[selectedChatId] || [] : [],
//   );
//   const currentUserId = "0";

//   const selectedChat = chats.find((chat) => chat.id === selectedChatId);

//   if (!selectedChatId || !selectedChat) {
//     return (
//       <div className={s.placeholder}>Выберите чат, чтобы начать общение</div>
//     );
//   }

//   const chatName =
//     selectedChat.type === "private" && selectedChat.otherUser
//       ? `${selectedChat.otherUser.firstName} ${selectedChat.otherUser.lastName}`
//       : selectedChat.name || "Чат";

//   const handleSendMessage = (content: string) => {
//     console.log("Отправка сообщения:", content);
//   };

//   return (
//     <div className={s.chatWindow}>
//       <ChatHeader
//         name={chatName}
//         avatar={selectedChat.otherUser?.avatarUrl || selectedChat.avatarUrl}
//         isOnline={selectedChat.otherUser?.isOnline || false}
//       />

//       <MessageList messages={messages} currentUserId={currentUserId} />

//       <MessageInput onSend={handleSendMessage} />
//     </div>
//   );
// };

// export default ChatWindow;
// export { ChatWindow };

interface MessageSubscriptionData {
  messageSent: Message;
}

interface GetMessageData {
  messages: Message[];
}

export const ChatWindow = () => {
  const { data, loading } = useQuery<GetMessageData>(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async (text: string) => {
    await sendMessage({
      variables: {
        text,
        author: "Me",
      },
    });
  };

  useSubscription<MessageSubscriptionData>(MESSAGE_SUBSCRIPTION, {
    onData: ({ client, data }) => {
      const newMessage = data.data?.messageSent;
      if (!newMessage) return;

      client.cache.updateQuery<GetMessageData>(
        { query: GET_MESSAGES },
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
