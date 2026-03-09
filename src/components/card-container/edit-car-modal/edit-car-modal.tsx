import { useState } from "react";
import type { Car } from "../../../api/api";
import { Button } from "../../UI/button/button";
import "./edit-car-modal.css"
import {Input} from "../../UI/input/input";

interface Props {
    car: Car | null;
    onSave: (car: Car) => void;
    onClose: () => void;
}

export const EditCarModal = ({ car, onSave, onClose }: Props) => {
    const [name, setName] = useState(car?.name ?? "");
    const [price, setPrice] = useState(car?.price ?? 0);

    if (!car) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSave({
            ...car,
            name,
            price
        });
    };

    return (
        <div className="modal">
            <form className="modal-content" onSubmit={handleSubmit}>

                <h2>Редактировать машину</h2>

                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название"
                    required
                />

                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Цена"
                    required
                />

                <div className="buttons">
                    <Button type="submit">Сохранить</Button>
                    <Button variant="secondary" onClick={onClose}>
                        Отмена
                    </Button>
                </div>

            </form>
        </div>
    );
};