import React, { useCallback, useEffect, useRef, useState } from "react";
import Portal, { createContainer } from "../portal/portal.tsx";
import s from "./modal.module.scss";
import {Button} from "../button/button";

const MODAL_CONTAINER_ID = "modal-container-id";

type IModal = {
    title: string;
    onClose: () => void;
    children: React.ReactNode | React.ReactNode[];
};

const Modal = ({onClose, children, title}: IModal) => {

    const rootRef = useRef<HTMLDivElement>(null);
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscapePress);

        return () => {
            window.removeEventListener("keydown", handleEscapePress);
        };
    }, [onClose]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    return isMounted ? (
        <Portal id={MODAL_CONTAINER_ID}>
            <div className={s.modal} ref={rootRef}>
                <div className={s.content}>
                    <div className={s.header}>
                        <div className={s.title}>{title}</div>
                        <Button
                            type={'secondary'}
                            className={s.close}
                            onClick={handleClose}
                            text="Закрыть"
                        />
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    ) : null;
};

export default Modal;
