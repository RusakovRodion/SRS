import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { ListTools } from "../list_tools";
import { Characteristic } from "../data_interfaces";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export interface CharacteristicsPageProps {
    characteristicList: Characteristic[];
    onAdd: () => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function CharacteristicsPage({
    characteristicList,
    onAdd,
    onView,
    onEdit,
    onDelete,
}: CharacteristicsPageProps) {
    console.log("ch_list:", characteristicList)
    return (
        <div className="content">
            <h2>Характеристики</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {characteristicList.map((characteristic) => (
                    <div key={characteristic.id} className={list_item}>
                        <div className={list_item_info}>
                            {characteristic.name}
                        </div>
                        <ListTools onAdd={null} onView={() => onView(characteristic.id)} onEdit={() => onEdit(characteristic.id)} onDelete={() => onDelete(characteristic.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export interface ChInfoPageProps {
    chs: Characteristic[];
}

export function CharacteristicsInfoPage({ chs }: ChInfoPageProps) {
    const params = useParams();
    console.log(params["characteristic_id"])
    const ch = chs.find((e) => e.id === Number(params["characteristic_id"]))
    if (ch === undefined) {
        return <div className="content">Invalid ch</div>;
    }

    return (
        <div className="content">
            <h2>Просмотр характеристики: {ch.name}</h2>
            <h1>Единицы измерения:</h1>
            <div className="list">
                {ch.ums.map((characteristic) => (
                    <div key={characteristic.id} className={list_item}>
                        <div className={list_item_info}>
                            {characteristic.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
