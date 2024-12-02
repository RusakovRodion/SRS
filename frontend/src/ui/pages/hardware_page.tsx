import { AddButton, Button, SaveButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { Hardware, HardwareType, Project, Characteristic } from "../data_interfaces";
import { ListTools } from "../list_tools";
import Modal from "../modal";
import { button, icon_button } from "../buttons.module.css";
import { hardware_types } from "../fake_backend_data";
import { useState, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import "../modal.module.css";
import { useParams } from "react-router-dom";

export interface HardwarePageProps {
    hardwareList: Hardware[];
    onAdd: (id: number) => void;
    onView: (id: number) => void;
}

export function HardwarePage({
    hardwareList,
    onAdd,
    onView,
}: HardwarePageProps) {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const handleOpenForm = () => {
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = (htId: number): void => {
        console.log(htId)
        handleCloseForm();
        onAdd(htId)
    };
    return (
        <div className="content">
            <h2>Оборудование</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => handleOpenForm()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {hardwareList.map((hardware) => (
                    <div key={hardware.id} className={list_item}>
                        <div className={list_item_info}>{hardware.name}</div>
                        <div className={list_item_info}>{hardware.type_id}</div>
                        <div className={list_item_info}>{hardware.brand}</div>
                        <div className={list_item_info}>{hardware.model}</div>

                        <ListTools onAdd={null} onView={() => onView(hardware.id)} />
                    </div>
                ))}
            </div>
            <AddHardwareTypeForm
                isOpen={isFormOpen}
                onSubmit={handleFormSubmit}
                onClose={handleCloseForm}
                htsList={hardware_types}
            />
        </div>
    );
}

interface AddHardwareTypeFormProps {
    isOpen: boolean;
    onSubmit: (data: number) => void;
    onClose: () => void;
    htsList: HardwareType[];
}

const AddHardwareTypeForm = ({
    onSubmit,
    isOpen,
    onClose,
    htsList,
}: AddHardwareTypeFormProps) => {
    const handleAdd = (id: number): void => {
        onSubmit(id)
    };

    return (
        <Modal hasCloseBtn={false} isOpen={isOpen} onClose={onClose}>
            <form>
                <label>Выбрать тип оборудования</label>
                <div className={"label_and_add_button"}>
                    <input type="search" placeholder="Поиск" />
                </div>
                <div className="list" >
                    {htsList.map((p) => (
                        <div key={p.id}  className={list_item} >
                            <div className={list_item_info}>{p.name}</div>
                            <ListTools onAdd={() => {handleAdd(p.id)}}/>
                        </div>
                    ))}
                </div>
            </form>
        </Modal>
    );
};

type FormValues = {
    type_id: number;
    name: string;
    brand: string;
    model: string;
    description: string;
    chs: {};
};

export interface AddHardwareFormProps {
    onAdd: (hardware: Hardware) => void;
    onEdit: (hardware: Hardware) => void;
    projects: Project[];
    objects: Object[];
    hardwares: Hardware[]
    characteristics: Characteristic[]
}

export function AddHardwareForm({ onAdd, onEdit, projects, objects, characteristics, hardwares}: AddHardwareFormProps) {
    const { resetField, register, handleSubmit } = useForm<FormValues>();
    const location = useLocation();
    var id = -1;
    var htId = -1;
    var add_chs = [] as Characteristic[]
    if (location.state !== null) {
        if(location.state.id) {
            id = location.state.id;
            console.log(hardwares[hardwares.findIndex((h) => h.id == id)].chs);
        }
         if(location.state.htId) htId = location.state.htId;

    }
    if (htId != -1) {
        ///sdfsdfsdf
    }
    console.log('id', id)
    console.log('htid', htId)

    const [addedChs, setAddedChs] = useState(add_chs);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        /*const object = {
            id: objId,
            name: data.name,
            description: data.description,
            project_id: Number(data.project_id),
            registration_number: data.registration_number,
            added: "",
            hardwares: addedHardwares,
        } as Object;
        if (object.id == -1) onAdd(object);
        else onEdit(object);*/
    };
    const [isFromOpen, setFormOpen] = useState<boolean>(false);

    const handleDel = (id:number) => {
        /*let index = addedHardwares.findIndex(
            (d) => d.id === id,
        );
        let addedChs_del = [...addedHardwares.slice(0, index), ...addedHardwares.slice(index + 1)]
        setAddedHardwares(addedChs_del)*/
    }

    return (
        <>
        <div className="content">
            {htId == -1 ? <h2> Новое оборудование </h2>: <h2>Редактирование оборудования</h2>}
            <form id="edit_project_form" onSubmit={handleSubmit(onSubmit)}>
                <h3>Тип оборудования</h3>
                <input
                    type="text"
                    id="type_id"
                    {...register("type_id")}
                    value={hardware_types.find((ht)=>ht.id == htId).name}
                    placeholder={hardware_types.find((ht)=>ht.id == htId).name}
                    required
                    readonly
                />
                <h3>Название</h3>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Название"
                    required
                />
                <h3>Марка</h3>
                <input
                    type="text"
                    id="brand"
                    {...register("brand")}
                    placeholder="Марка"
                    required
                />
                <h3>Модель</h3>
                <input
                    type="text"
                    id="model"
                    {...register("model")}
                    placeholder="Модель"
                    required
                />
                <h3>Описание</h3>
                <textarea
                    id="description"
                    {...register("description")}
                    rows={5}
                    placeholder="Описание"
                    required
                />
                <div className={"label_and_add_button"}>
                    <label>Характеристики:</label>
                </div>
                <div className="save_btn_block">
                    <SaveButton />
                </div>
            </form>
        </div>

        </>
    );
}
