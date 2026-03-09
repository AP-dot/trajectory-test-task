import { useState, useRef } from "react";
import { Button } from "../../UI/button/button.tsx";
import { Select } from "../../UI/select/select.tsx";
import "./control-panel.css";

interface ControlPanelProps {
    handleSort: (value: string) => void;
    handleAdd: () => void;
    handleUpdate: () => void;
    className?: string;
}

export const ControlPanel = ({
    handleSort,
    handleAdd,
    handleUpdate,
    className = ""
}: ControlPanelProps) => {
    const [sort, setSort] = useState("year");
    const selectRef = useRef<HTMLSelectElement>(null);

    const onSortChange = (value: string) => {
        setSort(value);
        handleSort(value);
    };

    return (
        <div className={["control-panel", className].join(" ")}>
            <Select
                ref={selectRef}
                label="Сортировка"
                placeholder="Сортировать по"
                value={sort}
                onChange={onSortChange}
                options={[
                    { value: "year", label: "Год" },
                    { value: "price", label: "Цена" },
                ]}
            />

            <div className="control-panel__buttons">
                <Button
                    variant="primary"
                    onClick={handleUpdate}
                >
                    Обновить
                </Button>

                <Button
                    variant="primary"
                    onClick={handleAdd}
                >
                    Добавить
                </Button>
            </div>
        </div>
    );
};