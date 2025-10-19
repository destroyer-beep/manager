import { Outlet } from "react-router-dom";
import { Header } from "../header/header";
import s from './app-wrapper.module.scss';

export const AppWrapper = () => {
    return <div className={s.appWrapper}>
        <Header/>
        <Outlet/>
    </div>
}