import { forwardRef } from "react";
import "./select.css";

type Option = {
    value: string;
    label: string;
};

interface SelectProps {
    label?: string;
    options: Option[];
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    onChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    options,
    value,
    placeholder = "Выберите...",
    disabled = false,
    className = "",
    onChange
}, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className="select">
            {label && <label className="select__label">{label}</label>}

            <div
                className={[
                    "select__wrapper", disabled ? "select__wrapper--disabled" : ""].join(" ")}>

                <select
                    ref={ref}
                    disabled={disabled}
                    value={value}
                    onChange={handleChange}
                    className={["select__field", className].join(" ")}
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>

                <span className="select__arrow">▾</span>
            </div>
        </div>
    );
});

Select.displayName = "Select";