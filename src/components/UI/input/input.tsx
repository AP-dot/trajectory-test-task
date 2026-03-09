import {type InputHTMLAttributes, useId, forwardRef} from "react";
import "./input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    className = "",
    id,
    disabled,
    ...props
}, ref) => {
    const inputId = id ?? useId();

    return (
        <div className="input">
            {label && (<label className="input__label" htmlFor={inputId}>{label}</label>)}

            <div
                className={["input__wrapper", disabled ? "input__wrapper--disabled" : ""].join(" ")}>

                <input
                    ref={ref}
                    id={inputId}
                    disabled={disabled}

                    className={["input__field", className].join(" ")}
                    {...props}
                />
            </div>


        </div>
    );
});

Input.displayName = "Input";