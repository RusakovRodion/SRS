import React, { useRef, useEffect, useState } from "react";
import { modal, modal_close_btn } from "./modal.module.css";

interface ModalProps {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    hasCloseBtn = true,
    onClose,
    children,
}) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current) {
            // NOTE: т.к. мы используем нативный <dialog> обработка выглядит как-то так...
            // для реакта более адекватного решения не нашёл
            const rect = modalRef.current.getBoundingClientRect();
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

    return (
        <div style={{}}>
            <dialog ref={modalRef} onKeyDown={handleKeyDown} className={modal}>
                {hasCloseBtn && (
                    <button
                        className={modal_close_btn}
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                )}
                {children}
            </dialog>
        </div>
    );
};

export default Modal;
