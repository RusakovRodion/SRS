import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { Hardware } from "../data_interfaces";
import { ListTools } from "../list_tools";

export interface HardwarePageProps {
    hardwareList: Hardware[];
    onAdd: () => void;
    onView: (id: number) => void;
}

export function HardwarePage({
    hardwareList,
    onAdd,
    onView,
}: HardwarePageProps) {
    return (
        <div className="content">
            <h2>Оборудование</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {hardwareList.map((hardware) => (
                    <div key={hardware.id} className={list_item}>
                        <div className={list_item_info}>{hardware.name}</div>
                        <div className={list_item_info}>{hardware.type_id}</div>
                        <div className={list_item_info}>{hardware.brand}</div>
                        <div className={list_item_info}>{hardware.model}</div>

                        <ListTools onView={() => onView(hardware.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
