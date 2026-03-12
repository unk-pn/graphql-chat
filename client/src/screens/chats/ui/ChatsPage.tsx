"use client";

import ChatSidebar from "@/features/chatSidebar";
import ChatWindow from "@/widgets/chatWindow";

import s from "./ChatPage.module.scss";

const ChatsPage = () => {
  return (
    <div className={s.chatPage}>
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatsPage;
export { ChatsPage };
