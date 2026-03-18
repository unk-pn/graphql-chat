"use client";

import { useEffect, useState } from "react";
import { ChatItem } from "@/features/chatItem";
import { setSelectedChat } from "@/store/chatSlice";
import s from "./ChatSidebar.module.scss";
import {
  CHAT_UPDATED_SUBSCRIPTION,
  CREATE_CHAT,
  GET_CHATS,
  GET_ME,
  SEARCH_USERS,
} from "@/shared/api/queries";
import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client/react";
import { Chat, User } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { useRouter } from "next/navigation";

interface GetChatsData {
  chats: Chat[];
}

interface SearchUsersData {
  searchUsers: User[];
}

interface ChatUpdatedSubscriptionData {
  chatUpdated: Chat;
}

interface CreateChatMutationData {
  createChat: Chat;
}

const ChatSidebar = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsers, { data: searchResults }] =
    useLazyQuery<SearchUsersData>(SEARCH_USERS);

  const { data: meData } = useQuery<{ me: User }>(GET_ME);
  const currentUser = meData?.me;

  const router = useRouter();
  const apolloClient = useApolloClient();

  const { data, loading, subscribeToMore } = useQuery<GetChatsData>(GET_CHATS);
  const chats = data?.chats || [];

  const selectedChatId = useAppSelector((state) => state.chat.selectedChatId);

  const filteredChats = chats.filter((chat) => {
    const name = chat.otherUser
      ? `${chat.otherUser.username}`
      : (chat.name || "").toLowerCase();

    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedChats = [...filteredChats].sort((a, b) => {
    const dateA = a.lastMessage?.createdAt
      ? Number(a.lastMessage.createdAt)
      : 0;
    const dateB = b.lastMessage?.createdAt
      ? Number(b.lastMessage.createdAt)
      : 0;
    return dateB - dateA;
  });

  const [createChat] = useMutation<CreateChatMutationData>(CREATE_CHAT, {
    refetchQueries: [{ query: GET_CHATS }],
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore<ChatUpdatedSubscriptionData>({
      document: CHAT_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data || !prev.chats) return prev as GetChatsData;
        const updatedChat = subscriptionData.data.chatUpdated;

        const exists = prev.chats.find((c) =>
          c.id === updatedChat.id ? updatedChat : c,
        );

        if (exists) {
          const newChats = prev.chats.map((c) =>
            c.id === updatedChat.id ? updatedChat : c,
          );
          return { chats: newChats } as GetChatsData;
        } else {
          return { chats: [updatedChat, ...prev.chats] } as GetChatsData;
        }
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  const handleCreateChat = async (userId: string) => {
    try {
      const { data } = await createChat({ variables: { userId } });
      if (data?.createChat) {
        dispatch(setSelectedChat(data.createChat.id));
        setSearchQuery("");
      }
    } catch (error) {
      console.log("Error creating chat: ", error);
    }
  };

  const handleChatClick = (chatId: string) => {
    dispatch(setSelectedChat(chatId));
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    apolloClient.clearStore();
    router.push("/login");
  };

  if (loading) return <div className={s.loading}>Загрузка чатов...</div>;

  return (
    <aside className={s.sidebar}>
      <div className={s.searchWrapper}>
        <input
          type={"text"}
          className={s.searchInput}
          placeholder={"Поиск чатов..."}
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
            if (value.length > 2) searchUsers({ variables: { query: value } });
          }}
        />
      </div>

      <div className={s.chatList}>
        {searchQuery.length > 2 && searchResults?.searchUsers
          ? searchResults.searchUsers.map((user) => (
              <ChatItem
                key={user.id}
                user={user}
                onClick={() => handleCreateChat(user.id)}
              />
            ))
          : sortedChats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isSelected={selectedChatId === chat.id}
                onClick={() => handleChatClick(chat.id)}
              />
            ))}

        {filteredChats.length === 0 && (
          <div className={s.emptyState}>
            <p>Чаты не найдены</p>
          </div>
        )}
      </div>

      {/* User info */}
      {currentUser && (
        <div className={s.userInfo}>
          <div className={s.avatarWrapper}>
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt="avatar"
                className={s.avatar}
              />
            ) : (
              <div className={s.avatar} />
            )}
            {currentUser.isOnline && <div className={s.onlineIndicator} />}
          </div>

          <div className={s.userDetails}>
            <h3>{currentUser.username}</h3>
            <p className={s.userId}>#{currentUser.id?.slice(0, 10)}...</p>
          </div>

          <button
            className={s.logoutButton}
            onClick={handleLogout}
            title="Выйти"
          >
            Выйти
          </button>
        </div>
      )}
    </aside>
  );
};

export default ChatSidebar;
export { ChatSidebar };
