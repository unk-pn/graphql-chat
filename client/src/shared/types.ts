// Типы для UI компонентов (без логики)

export interface User {
    id: string
    username: string
    firstName: string
    lastName: string
    avatarUrl?: string
    isOnline: boolean
}

export interface Message {
    id: string
    senderId: string
    content: string
    createdAt: string
    isRead: boolean
}

export interface Chat {
    id: string
    type: 'private' | 'group'
    name?: string
    avatarUrl?: string
    otherUser?: User
    lastMessage?: Message
    unreadCount: number
}

// Моковые данные для UI
export const MOCK_USERS: User[] = [
    {
        id: '1',
        username: 'john_doe',
        firstName: 'Джон',
        lastName: 'Доу',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        isOnline: true,
    },
    {
        id: '2',
        username: 'jane_smith',
        firstName: 'Джейн',
        lastName: 'Смит',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
        isOnline: false,
    },
    {
        id: '3',
        username: 'alex_brown',
        firstName: 'Алекс',
        lastName: 'Браун',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        isOnline: true,
    },
]

export const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        senderId: '1',
        content: 'Привет! Как дела?',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isRead: true,
    },
    {
        id: '2',
        senderId: '0',
        content: 'Привет! Все отлично, спасибо!',
        createdAt: new Date(Date.now() - 3000000).toISOString(),
        isRead: true,
    },
    {
        id: '3',
        senderId: '1',
        content: 'Работаешь над проектом?',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        isRead: true,
    },
    {
        id: '4',
        senderId: '0',
        content: 'Да, делаю мессенджер. Получается неплохо!',
        createdAt: new Date(Date.now() - 600000).toISOString(),
        isRead: false,
    },
]

// Моковые сообщения для каждого чата
export const MOCK_CHAT_MESSAGES: Record<string, Message[]> = {
    '1': [
        {
            id: '1',
            senderId: '1',
            content: 'Привет! Как дела?',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            isRead: true,
        },
        {
            id: '2',
            senderId: '0',
            content: 'Привет! Все отлично, спасибо!',
            createdAt: new Date(Date.now() - 3000000).toISOString(),
            isRead: true,
        },
        {
            id: '3',
            senderId: '1',
            content: 'Работаешь над проектом?',
            createdAt: new Date(Date.now() - 1800000).toISOString(),
            isRead: true,
        },
        {
            id: '4',
            senderId: '0',
            content: 'Да, делаю мессенджер. Получается неплохо!',
            createdAt: new Date(Date.now() - 600000).toISOString(),
            isRead: false,
        },
    ],
    '2': [
        {
            id: '5',
            senderId: '2',
            content: 'Привет! Давно не виделись',
            createdAt: new Date(Date.now() - 90000000).toISOString(),
            isRead: true,
        },
        {
            id: '6',
            senderId: '0',
            content: 'Да, точно! Как ты?',
            createdAt: new Date(Date.now() - 88000000).toISOString(),
            isRead: true,
        },
        {
            id: '7',
            senderId: '2',
            content: 'Все хорошо! Встретимся завтра?',
            createdAt: new Date(Date.now() - 87000000).toISOString(),
            isRead: true,
        },
        {
            id: '8',
            senderId: '0',
            content: 'Конечно!',
            createdAt: new Date(Date.now() - 86500000).toISOString(),
            isRead: true,
        },
        {
            id: '9',
            senderId: '2',
            content: 'Увидимся завтра!',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            isRead: true,
        },
    ],
    '3': [
        {
            id: '10',
            senderId: '3',
            content: 'Привет! У меня есть идея для проекта',
            createdAt: new Date(Date.now() - 173000000).toISOString(),
            isRead: true,
        },
        {
            id: '11',
            senderId: '0',
            content: 'Интересно! Расскажи',
            createdAt: new Date(Date.now() - 172900000).toISOString(),
            isRead: true,
        },
        {
            id: '12',
            senderId: '3',
            content: 'Можем сделать мессенджер с крутым UI',
            createdAt: new Date(Date.now() - 172850000).toISOString(),
            isRead: true,
        },
        {
            id: '13',
            senderId: '0',
            content: 'Отличная идея!',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            isRead: true,
        },
    ],
}

export const MOCK_CHATS: Chat[] = [
    {
        id: '1',
        type: 'private',
        otherUser: MOCK_USERS[0],
        lastMessage: {
            id: '4',
            senderId: '0',
            content: 'Да, делаю мессенджер. Получается неплохо!',
            createdAt: new Date(Date.now() - 600000).toISOString(),
            isRead: false,
        },
        unreadCount: 2,
    },
    {
        id: '2',
        type: 'private',
        otherUser: MOCK_USERS[1],
        lastMessage: {
            id: '5',
            senderId: '2',
            content: 'Увидимся завтра!',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            isRead: true,
        },
        unreadCount: 0,
    },
    {
        id: '3',
        type: 'private',
        otherUser: MOCK_USERS[2],
        lastMessage: {
            id: '6',
            senderId: '3',
            content: 'Отличная идея!',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            isRead: true,
        },
        unreadCount: 0,
    },
]
