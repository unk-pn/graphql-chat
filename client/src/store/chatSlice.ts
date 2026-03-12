import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Chat, Message, MOCK_CHATS, MOCK_CHAT_MESSAGES } from '@/shared/types'

interface ChatState {
    chats: Chat[]
    selectedChatId: string | null
    messages: Record<string, Message[]>
}

const initialState: ChatState = {
    chats: MOCK_CHATS,
    selectedChatId: null,
    messages: MOCK_CHAT_MESSAGES,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedChat: (state, action: PayloadAction<string | null>) => {
            state.selectedChatId = action.payload
        },
    },
})

export const { setSelectedChat } = chatSlice.actions
export default chatSlice.reducer
