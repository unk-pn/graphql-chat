"use client";

import ChatSidebar from "@/features/chatSidebar";
import ChatWindow from "@/widgets/chatWindow";
import s from "./ChatPage.module.scss";
import { useAppSelector } from "@/shared/store";

const ChatsPage = () => {
  const selectedChatId = useAppSelector((state) => state.chat.selectedChatId);

  return (
    <div className={s.chatPage}>
      <ChatSidebar />
      {selectedChatId ? (
        <ChatWindow chatId={selectedChatId} />
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Выберите чат
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
export { ChatsPage };
