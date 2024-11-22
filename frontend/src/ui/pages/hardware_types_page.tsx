import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { ListTools } from "../list_tools";
import { HardwareType } from "../data_interfaces";

export interface HardwareTypesPageProps {
    hardwareTypesList: HardwareType[];
    onAdd: () => void;
    onView: (id: number) => void;
}

export function HardwareTypesPage({
    hardwareTypesList,
    onAdd,
    onView,
}: HardwareTypesPageProps) {
    return (
        <div className="content">
            <h2>Типы оборудования</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {hardwareTypesList.map((hardwareType) => (
                    <div key={hardwareType.id} className={list_item}>
                        <div className={list_item_info}>
                            {hardwareType.name}
                        </div>
                        <ListTools onView={() => onView(hardwareType.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
