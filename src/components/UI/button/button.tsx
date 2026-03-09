import { forwardRef, type ButtonHTMLAttributes} from "react";
import "./button.css";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = "primary",
    loading = false,
    disabled = false,
    className = "",
    children,
    ...props
}, ref) => {
    const isDisabled = disabled || loading;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            aria-busy={loading}
            className={[
                "btn",
                `btn--${variant}`,
                isDisabled ? "btn--disabled" : "",
                className,
            ].join(" ")}
            {...props}
        >
            <span className="btn__content">{children}</span>
        </button>
    );
});

Button.displayName = "Button";