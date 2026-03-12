import { type LabelHTMLAttributes } from 'react'

import s from './Label.module.scss'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string
    children: React.ReactNode
    className?: string
}

export const Label = ({ htmlFor, children, className, ...labelProps }: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className={`${s.label} ${className || ''}`} {...labelProps}>
            {children}
        </label>
    )
}
