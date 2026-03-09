import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import './map.css';
import type { Car } from "../../../api/api.tsx";

interface MapProps {
    cars: Car[];
}

export function Map({ cars }: MapProps) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);

    // Инициализация карты
    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: {
                version: 8,
                sources: {
                    "esri-satellite": {
                        type: "raster",
                        tiles: [
                            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        ],
                        tileSize: 256
                    }
                },
                layers: [
                    {
                        id: "esri-satellite-layer",
                        type: "raster",
                        source: "esri-satellite"
                    }
                ]
            },
            center: [30.3351, 59.9343], // Санкт-Петербкрг
            zoom: 10
        });

        return () => map.current?.remove();
    }, []);

    // Метки с машинами обновляются при изменении списка cars
    useEffect(() => {
        if (!map.current) return;

        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        cars.forEach(car => {
            if (car.latitude != null && car.longitude != null) {
                const marker = new maplibregl.Marker()
                    .setLngLat([car.longitude, car.latitude])
                    .addTo(map.current!);

                markersRef.current.push(marker);
            }
        });
    }, [cars]);

    return (
        <div
            ref={mapContainer}
            className="map-container"
            style={{ width: "100%", height: "400px" }}
        />
    );
}