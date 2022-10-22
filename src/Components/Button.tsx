type ButtonType = {
    text: string,
    className: string,
    onClick: () => void,
}

const Button: React.FC<ButtonType> = ({ text, className }) => {
    return (
        <>
            <button className={className}>{text}</button>
        </>
    );
}

export default Button;