import s from './header.module.scss';

export const Header = () => {
    return <div className={s.header}>
        <div className={s.wrapper}>
            <h1 className={s.logo}>Manager</h1>
        </div>
    </div>
}