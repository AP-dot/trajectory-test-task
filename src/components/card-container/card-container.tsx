import { useEffect, useState } from "react";
import { Map } from "./map/map.tsx";
import { Card } from "./card/card.tsx";
import { ControlPanel } from "./control-panel/control-panel.tsx";
import { EditCarModal } from "./edit-car-modal/edit-car-modal.tsx";
import { AddCarModal } from "./add-car-modal/add-car-modal.tsx";
import { fetchCars, type Car } from "../../api/api.tsx";
import "./card-container.css"

export function CardContainer() {
    const [cars, setCars] = useState<Car[]>([]);
    const [sort, setSort] = useState("year");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Сортировка машин
    const sortCars = (sort: string, carsToSort?: Car[]) => {
        setSort(sort);
        const sorted = [...(carsToSort || cars)];
        if (sort === "year") {
            sorted.sort((a, b) => a.year - b.year);
        }
        if (sort === "price") {
            sorted.sort((a, b) => a.price - b.price);
        }
        setCars(sorted);
    };

    // Загрузка машин из (localStorage / api)
    const loadCars = async () => {
        setLoading(true);
        setError(null);

        try {
            const stored = localStorage.getItem("cars");
            let data: Car[];
            if (stored) {
                data = JSON.parse(stored);
            } else {
                data = await fetchCars();
                localStorage.setItem("cars", JSON.stringify(data));
            }
            sortCars(sort, data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Начать редактирование машины
    const handleEdit = (car: Car) => {
        setEditingCar(car);
    };

    // Сохранить отредактированную машину
    const handleSave = (updatedCar: Car) => {
        setCars((prev) =>
            prev.map((car) =>
                car.id === updatedCar.id ? updatedCar : car
            )
        );
        setEditingCar(null);
    };

    // Открыть модальное окно для добавления машины
    const handleOpenAdd = () => {
        setIsAddOpen(true);
    };

    // Добавить машину
    const handleAdd = (car: Car) => {
        const updatedCars = [...cars, car];
        setCars(updatedCars);
        sortCars(sort, updatedCars);
    };

    // Сбросить список машин до изначального
    const handleReset = () => {
        localStorage.removeItem("cars");
        loadCars();
    };

    // Удалить машину
    const handleDelete = (car: Car) => {
        const updated = cars.filter((c) => c.id !== car.id);
        setCars(updated);
    };

    // Загрузка списка при монтировании компонента
    useEffect(() => {
        loadCars();
    }, []);

    // Обновление localStorage при изменении списка машин
    useEffect(() => {
        if (cars.length > 0) {
            localStorage.setItem("cars", JSON.stringify(cars));
        }
    }, [cars]);

    return (
        <div className="main-container">
            <Map cars={cars} />

            <ControlPanel
                handleSort={sortCars}
                handleUpdate={handleReset}
                handleAdd={handleOpenAdd}
            />

            <div className="card-container">
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p>Ошибка: {error}</p>
                ) : cars.length === 0 ? (
                    <p>Нет автомобилей</p>
                ) : (
                    cars.map((car) => (
                        <Card
                            key={car.id}
                            car={car}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

            <EditCarModal
                car={editingCar}
                onSave={handleSave}
                onClose={() => setEditingCar(null)}
            />
            {isAddOpen && (
                <AddCarModal
                    onSave={handleAdd}
                    onClose={() => setIsAddOpen(false)}
                />
            )}
        </div>
    );
}