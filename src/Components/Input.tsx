import { useState } from "react";

type InputType = {
    name: string,
    type: string,
    value: string | number,
    label: string,
    autoFocus?: boolean,
    setValue: (value: string) => void,
}

const Input: React.FC<InputType> = ({ label, value, name, type, setValue, autoFocus }) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleOnBlur = () => {
        setFocus(false)
        if (!value) {
            setError(true);
        } else {
            setError(false);
        }
    }

    const handleOnChange = (e: string) => {
        if (e.length > 15) {
            return;
        }
        if (!Number.isNaN(+e) && +e > 5000000) {
            return;
        }

        setValue(e);
        setError(false);
    }

    return (
        <div className="input-label-container">
            <div className="input-container">
                <input autoFocus={autoFocus} maxLength={15} max={5000000} className={error ? 'input-error' : value ? 'input-ok' : ''} spellCheck={false} onFocus={() => setFocus(!focus)} onBlur={handleOnBlur} required value={value ? value : ''} id={name} name={name} type={type} onChange={(e) => handleOnChange(e.target.value)} />
                <label className={focus || value ? 'label-focus' : error ? 'placeholder label-error' : 'placeholder'} htmlFor={name}>{label}</label>
            </div>
            <div className="error-span-container">
                <span className={error ? 'error-span' : 'hidden'}>{label} required.</span>
            </div>
        </div>
    );
}

export default Input;