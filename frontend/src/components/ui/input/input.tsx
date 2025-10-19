import { FC } from 'react';
import s from './input.module.scss';

interface IInputProps {
    value: string | number;
    onChange: (value: string) => void;
    placeholder: string;
}

export const Input: FC<IInputProps> = ({
                                    value,
                                    onChange,
                                    placeholder,
                                }) => {
    return (
        <input
            className={s.input}
            value={value || ''}
            placeholder={placeholder}
            type={'text'}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    );
};