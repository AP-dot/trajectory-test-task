import { useState } from "react";
import type { Car } from "../../../api/api";
import { Button } from "../../UI/button/button";
import { Input } from "../../UI/input/input";
import "./add-car-modal.css";

interface Props {
    onSave: (car: Car) => void;
    onClose: () => void;
}

export const AddCarModal = ({ onSave, onClose }: Props) => {

    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [color, setColor] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCar: Car = {
            id: Date.now(),
            name,
            model,
            year: Number(year),
            price: Number(price),
            color
        };

        onSave(newCar);
        onClose();
    };

    return (
        <div className="modal">
            <form className="modal-content" onSubmit={handleSubmit}>

                <h2>Добавить машину</h2>

                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    required
                />

                <Input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Модель"
                    required
                />

                <Input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    placeholder="Год"
                    required
                />

                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Цена"
                    required
                />

                <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Цвет"
                    required
                />

                <div className="buttons">
                    <Button type="submit">Сохранить</Button>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Отмена
                    </Button>
                </div>

            </form>
        </div>
    );
};