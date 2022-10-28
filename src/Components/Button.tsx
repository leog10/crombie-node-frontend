import './Button.css'

type ButtonType = {
    text: string,
    className: string,
    handleOnClick?: () => void,
    loading: boolean,
}

const Button: React.FC<ButtonType> = ({ text, className, handleOnClick, loading }) => {
    return (
        <button disabled={loading} className={className} onClick={handleOnClick}>{loading ? <div className="loader"></div> : ''}{text}</button>
    );
}

export default Button;