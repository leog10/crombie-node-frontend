import { useEffect } from "react";

type ModalType = {
    children: JSX.Element,
    closeModal: () => void,
}

const Modal: React.FC<ModalType> = ({ children, closeModal }) => {

    const handleOnKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
    }

    useEffect(() => {
        window.addEventListener('keyup', handleOnKeyUp);
        return () => window.removeEventListener('keyup', handleOnKeyUp);
    }, [])

    return (
        <div className="modal-container">
            <div className="modal">
                <div onClick={closeModal} className="close-modal"><i className="bi bi-x-lg"></i></div>
                {children}
            </div>
        </div>
    );
}

export default Modal;