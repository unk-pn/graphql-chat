"use client";

import ChatSidebar from "@/features/chatSidebar";
import ChatWindow from "@/widgets/chatWindow";

import s from "./ChatPage.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ChatsPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const token = localStorage.getItem("token");
  if (!token) return null;

  return (
    <div className={s.chatPage}>
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatsPage;
export { ChatsPage };
