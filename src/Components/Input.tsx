import { useState } from "react";

type InputType = {
    name: string,
    type: string,
    value: string | number,
    label: string
    setValue: (value: string) => void,
}

const Input: React.FC<InputType> = ({ label, value, name, type, setValue }) => {
    const [focus, setFocus] = useState<boolean>(false)

    return (
        <div className="input-container">
            <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} required value={value ? value : ''} id={name} name={name} type={type} onChange={(e) => setValue(e.target.value)} />
            <label className={focus || value ? 'label-focus' : 'placeholder'} htmlFor={name}>{label}</label>
        </div>
    );
}

export default Input;