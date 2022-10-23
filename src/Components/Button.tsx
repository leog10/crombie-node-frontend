type ButtonType = {
    text: string,
    className: string,
    handleOnClick: () => void,
}

const Button: React.FC<ButtonType> = ({ text, className, handleOnClick }) => {
    return (
        <>
            <button className={className} onClick={handleOnClick}>{text}</button>
        </>
    );
}

export default Button;