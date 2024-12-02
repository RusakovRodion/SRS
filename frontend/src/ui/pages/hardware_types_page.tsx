import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { ListTools } from "../list_tools";
import { HardwareType, Hardware } from "../data_interfaces";
import { useParams } from "react-router-dom";

export interface HardwareTypesPageProps {
    hardwareTypesList: HardwareType[];
    hardwareList: Hardware[];
    onAdd: () => void;
    onView: (id: number) => void;
    onEdit: (id: number) =>  void;
    onDelete: (id: number) =>  void;
}

export function HardwareTypesPage({
    hardwareTypesList,
    hardwareList,
    onAdd,
    onView,
    onEdit,
    onDelete,
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
                        <ListTools onAdd={null} onEdit={() => onEdit(hardwareType.id)} onView={() => onView(hardwareType.id)} onDelete={() => onDelete(hardwareType.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export interface HtInfoPageProps {
    hts: HardwareType[];
    hardwareList: Hardware[];
}

export function HtInfoPage({ hts, hardwareList }: HtInfoPageProps) {
    const params = useParams();
    const htId = Number(params["hardware_type_id"])
    const ht = hts.find((e) => e.id === htId)
    if (ht === undefined) {
        return <div className="content">Invalid ht</div>;
    }

    return (
        <div className="content">
            <h2>Просмотр типа оборудования: {ht.name}</h2>
            <h1>Характеристики:</h1>
            <div className="list">
                {ht.chs.map((characteristic) => (
                    <div key={characteristic.id} className={list_item}>
                        <div className={list_item_info}>
                            {characteristic.name}
                        </div>
                    </div>
                ))}
            </div>
            <hr/>
            <h1>Оборудование:</h1>
             <div className="list">
                {hardwareList.map((h) => ( h.type_id == htId ?
                    <div key={h.id} className={list_item}>
                        <div className={list_item_info}>{h.name}</div>
                        <div className={list_item_info}>{h.type_id}</div>
                        <div className={list_item_info}>{h.brand}</div>
                        <div className={list_item_info}>{h.model}</div>
                    </div> : ''
                ))}
            </div>
        </div>
    );
}
