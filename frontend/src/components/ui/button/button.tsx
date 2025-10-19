import { FC } from "react";
import s from './button.module.scss';
import cn from 'classnames'

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    type?: 'primary' | 'secondary';
    isDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({text, onClick, className, type, isDisabled}) => {
    return <button
        className={cn(s.button, type === 'secondary' && s.secondary, isDisabled && s.disabled, className)}
        onClick={onClick}
        disabled={isDisabled}
    >
        {text}
    </button>
}