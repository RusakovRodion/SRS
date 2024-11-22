import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { Object } from "../data_interfaces";
import { ListTools } from "../list_tools";

export interface ObjectPageProps {
    objectsList: Object[];
    onAdd: () => void;
    onView: (id: number) => void;
}

export function ObjectsPage({ objectsList, onAdd, onView }: ObjectPageProps) {
    return (
        <div className="content">
            <h2>Проекты</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {objectsList.map((object) => (
                    <div key={object.id} className={list_item}>
                        <div className={list_item_info}>{object.name}</div>
                        <div className={list_item_info}>{object.projectId}</div>
                        <div className={list_item_info}>{object.regNumber}</div>
                        <ListTools onView={() => onView(object.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
