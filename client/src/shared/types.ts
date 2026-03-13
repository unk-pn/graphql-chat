// Типы для UI компонентов (без логики)

export interface User {
    id: string
    username: string
    avatarUrl?: string
    isOnline: boolean
}

export interface Message {
    id: string
    text: string
    author: string
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