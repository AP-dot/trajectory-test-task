import { forwardRef } from "react";
import type {Car} from "../../../api/api.tsx";
import { Button } from "../../UI/button/button.tsx";
import "./card.css";

interface CardProps {
    car: Car;
    onEdit?: (car: Car) => void;
    onDelete?: (car: Car) => void;
    className?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ car, onEdit, onDelete, className = "" }, ref) => {
        return (
            <div ref={ref} className={["card", className].join(" ")}>
                <div className="card__content">
                    <div className="card__title">
                        <h3>{car.name}</h3>
                        <h3>{car.model}</h3>
                    </div>
                    <p className="card__subtitle">{car.year} • {car.color}</p>
                    <p>Цена: ${car.price.toLocaleString()}</p>
                </div>

                <div className="card__buttons">
                    <Button variant="secondary" onClick={() => onEdit?.(car)}>
                        Редактировать
                    </Button>
                    <Button variant="danger" onClick={() => onDelete?.(car)}>
                        Удалить
                    </Button>
                </div>
            </div>
        );
    }
);

Card.displayName = "Card";