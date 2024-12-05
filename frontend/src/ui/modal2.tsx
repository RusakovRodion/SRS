import React, { useEffect, useRef } from "react";
import { close_button } from "./modal2.module.css";
import { X } from "react-feather";

export interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    showCloseButton: boolean;
}

export function Modal({ children, onClose, showCloseButton }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (dialogRef.current) {
            // NOTE: т.к. мы используем нативный <dialog> обработка выглядит как-то так...
            // для реакта более адекватного решения не нашёл
            const rect = dialogRef.current.getBoundingClientRect();
            var isInDialog =
                rect.top <= e.clientY &&
                e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX &&
                e.clientX <= rect.left + rect.width;

            if (!isInDialog) {
                if (onClose) {
                    onClose();
                }
            }
        }
    };

    // Обработка клика ВНЕ формы
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            dialogRef.current.addEventListener("cancel", (e) => {
                e.preventDefault();
                onClose();
            });
        }
    }, [dialogRef.current]);

    return (
        <dialog ref={dialogRef}>
            {showCloseButton && (
                <button className={close_button} onClick={() => onClose()}>
                    <X />
                </button>
            )}
            {children}
        </dialog>
    );
}
