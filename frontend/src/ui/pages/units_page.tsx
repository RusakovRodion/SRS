import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { ListTools } from "../list_tools";
import { UM } from "../data_interfaces";

export interface UnitsPageProps {
    unitsList: UM[];
    onAdd: () => void;
    onView: (id: number) => void;
}

export function UnitsPage({ unitsList, onAdd, onView }: UnitsPageProps) {
    return (
        <div className="content">
            <h2>Единицы измерения</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {unitsList.map((unit) => (
                    <div key={unit.id} className={list_item}>
                        <div className={list_item_info}>{unit.name}</div>
                        <div className={list_item_info}>{unit.accuracy}</div>
                        <ListTools onView={() => onView(unit.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
