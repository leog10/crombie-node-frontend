import { useEffect } from "react";

type ModalType = {
    children: JSX.Element,
    closeModal: () => void,
}

const Modal: React.FC<ModalType> = ({ children, closeModal }) => {

    useEffect(() => {
        const handleOnKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        }
        window.addEventListener('keyup', handleOnKeyUp);
        return () => window.removeEventListener('keyup', handleOnKeyUp);
    }, [closeModal])

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    return (
        <div onClick={(e) => handleCloseModal(e)} className="modal-container">
            <div className="modal">
                <div onClick={closeModal} className="close-modal"><i className="bi bi-x-lg"></i></div>
                {children}
            </div>
        </div>
    );
}

export default Modal;