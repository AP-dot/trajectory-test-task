export interface Car {
    id: number;
    name: string;
    model: string;
    year: number;
    color: string;
    price: number;
    latitude?: number;
    longitude?: number;
}

export async function fetchCars(): Promise<Car[]> {
    const res = await fetch("https://task.tspb.su/test-task/vehicles");
    if (!res.ok) throw new Error("Ошибка получения данных");
    return res.json();
}