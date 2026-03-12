'use client'

import s from './ChatHeader.module.scss'

interface ChatHeaderProps {
    name: string
    avatar?: string
    isOnline: boolean
    lastSeen?: string
}

const ChatHeader = ({ name, avatar, isOnline, lastSeen }: ChatHeaderProps) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .slice(0, 2)
    }

    return (
        <div className={s.chatHeader}>
            <div className={s.userInfo}>
                <div className={s.avatarWrapper}>
                    <div className={s.avatar}>
                        {avatar ? (
                            <img src={avatar} alt={name} />
                        ) : (
                            <span className={s.avatarPlaceholder}>{getInitials(name)}</span>
                        )}
                    </div>
                    {isOnline && <span className={s.onlineIndicator} />}
                </div>

                <div className={s.details}>
                    <span className={s.name}>{name}</span>
                    <span className={s.status}>
                        {isOnline ? 'онлайн' : lastSeen ? `был(а) ${lastSeen}` : 'офлайн'}
                    </span>
                </div>
            </div>

            <div className={s.actions}>
                <button className={s.actionButton} title={'Поиск'}>
                    <SearchIcon />
                </button>
                <button className={s.actionButton} title={'Ещё'}>
                    <MoreIcon />
                </button>
            </div>
        </div>
    )
}

// Простые SVG иконки
const SearchIcon = () => (
    <svg
        width={'20'}
        height={'20'}
        viewBox={'0 0 24 24'}
        fill={'none'}
        stroke={'currentColor'}
        strokeWidth={'2'}
    >
        <circle cx={'11'} cy={'11'} r={'8'} />
        <path d={'M21 21l-4.35-4.35'} />
    </svg>
)

const MoreIcon = () => (
    <svg width={'20'} height={'20'} viewBox={'0 0 24 24'} fill={'currentColor'}>
        <circle cx={'12'} cy={'5'} r={'2'} />
        <circle cx={'12'} cy={'12'} r={'2'} />
        <circle cx={'12'} cy={'19'} r={'2'} />
    </svg>
)

export default ChatHeader
export { ChatHeader }
