import { AddButton, Button, SaveButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import {
    Hardware,
    HardwareType,
    Hardware_ch,
    Project,
    Characteristic,
    Object,
    ProjectType,
    UM,
} from "../data_interfaces";
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
    onEdit: (id: number) => void;
    onView: (id: number) => void;
    onDelete: (id: number) => void;
}

export function HardwarePage({
    hardwareList,
    onAdd,
    onEdit,
    onView,
    onDelete,
}: HardwarePageProps) {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const handleOpenForm = () => {
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = (htId: number): void => {
        console.log(htId);
        handleCloseForm();
        onAdd(htId);
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

                        <ListTools
                            onAdd={null}
                            onView={() => onView(hardware.id)}
                            onEdit={() => onEdit(hardware.id)}
                            onDelete={() => onDelete(hardware.id)}
                        />
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
        onSubmit(id);
    };

    return (
        <Modal hasCloseBtn={false} isOpen={isOpen} onClose={onClose}>
            <form>
                <label>Выбрать тип оборудования</label>
                <div className={"label_and_add_button"}>
                    <input type="search" placeholder="Поиск" />
                </div>
                <div className="list">
                    {htsList.map((p) => (
                        <div key={p.id} className={list_item}>
                            <div className={list_item_info}>{p.name}</div>
                            <ListTools
                                onAdd={() => {
                                    handleAdd(p.id);
                                }}
                            />
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
    chs: Hardware_ch[];
};

export interface AddHardwareFormProps {
    onAdd: (hardware: Hardware) => void;
    onEdit: (hardware: Hardware) => void;
    projects: Project[];
    objects: Object[];
    hardwares: Hardware[];
    hts: HardwareType[];
    characteristics: Characteristic[];
}

export function AddHardwareForm({
    onAdd,
    onEdit,
    projects,
    objects,
    hts,
    characteristics,
    hardwares,
}: AddHardwareFormProps) {
    const { resetField, register, handleSubmit } = useForm<FormValues>();
    const location = useLocation();
    var id = -1;
    var htId = -1;
    var add_chs = [] as Characteristic[];
    if (location.state !== null) {
        if (location.state.id) {
            id = location.state.id;
            htId = Number(hardwares.find((h) => h.id == id).type_id);
        }
        if (location.state.htId) {
            htId = location.state.htId;
        }
        add_chs = hts.find((ht) => ht.id == htId).chs;
    }
    console.log(add_chs);
    if (id != -1) {
        let hardware = hardwares.find((h) => h.id == id);
        console.log(hardware);
        let ch_ids = hardware.chs.map((ch) => ch.ch_id);
        useEffect(() => {
            //setAddedUms(add_ums)
            resetField("name", { defaultValue: hardware.name });
            resetField("brand", { defaultValue: hardware.brand });
            resetField("model", { defaultValue: hardware.model });
            resetField("description", { defaultValue: hardware.description });
            for (let i = 0; i < ch_ids.length; i++) {
                resetField("ch" + ch_ids[i], {
                    defaultValue: hardware.chs.find(
                        (ch) => ch.ch_id == ch_ids[i],
                    ).value,
                });
                resetField("um" + ch_ids[i], {
                    defaultValue: hardware.chs.find(
                        (ch) => ch.ch_id == ch_ids[i],
                    ).ums_id,
                });
            }
        }, [
            hardware.name,
            hardware.description,
            hardware.brand,
            hardware.model,
        ]);
    }
    console.log("id", id);
    console.log("htid", htId);

    const [addedChs, setAddedChs] = useState(add_chs);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        console.log(add_chs.map((ch) => ch.id));
        const ch_ids = add_chs.map((ch) => ch.id);
        let new_chs = [] as Hardware_ch[];
        for (let i = 0; i < ch_ids.length; i++) {
            let hch = {
                ch_id: ch_ids[i],
                value: data["ch" + ch_ids[i]],
                ums_id: Number(data["um" + ch_ids[i]]),
            } as Hardware_ch;
            new_chs.push(hch);
        }
        console.log(new_chs);
        const hardware = {
            id: id,
            name: data.name,
            brand: data.brand,
            model: data.model,
            description: data.description,
            added: "",
            type_id: htId,
            chs: new_chs,
        } as Hardware;
        if (hardware.id == -1) onAdd(hardware);
        else onEdit(hardware);
    };
    const [isFromOpen, setFormOpen] = useState<boolean>(false);

    const render_opt = (ch: Characteristic) => {
        return ch.ums.map((um) => <option value={um.id}> {um.name} </option>);
    };

    return (
        <>
            <div className="content">
                {id == -1 ? (
                    <h2> Новое оборудование </h2>
                ) : (
                    <h2>Редактирование оборудования</h2>
                )}
                <form id="edit_project_form" onSubmit={handleSubmit(onSubmit)}>
                    <h3>Тип оборудования</h3>
                    <input
                        type="text"
                        id="type_id"
                        {...register("type_id")}
                        value={hardware_types.find((ht) => ht.id == htId).name}
                        placeholder={
                            hardware_types.find((ht) => ht.id == htId).name
                        }
                        required
                        readOnly
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
                    {add_chs.map((ch) => (
                        <>
                            <p>{ch.name}</p>
                            <div className={"label_and_add_button"}>
                                <input
                                    type="number"
                                    {...register("ch" + String(ch.id))}
                                    placeholder="Значение"
                                    required
                                />
                                <select {...register("um" + String(ch.id))}>
                                    {render_opt(ch)}
                                </select>
                            </div>
                        </>
                    ))}
                    <div className="save_btn_block">
                        <SaveButton />
                    </div>
                </form>
                {id != -1 ? (
                    <div>
                        <hr />
                        <h1>Проекты:</h1>
                        <div className="list">
                            {projects.map((pr) =>
                                pr.hardwares.find((h) => h.id == id) ? (
                                    <div key={pr.id} className={list_item}>
                                        <div className={list_item_info}>
                                            {pr.name}
                                        </div>
                                        <div className={list_item_info}>
                                            {pr.type_id}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                ),
                            )}
                        </div>
                        <h1>Объекты:</h1>
                        <div className="list">
                            {objects.map((obj) =>
                                obj.hardwares.find((h) => h.id == id) ? (
                                    <div key={obj.id} className={list_item}>
                                        <div className={list_item_info}>
                                            {obj.name}
                                        </div>
                                        <div className={list_item_info}>
                                            {obj.registration_number}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                ),
                            )}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

export interface HardwareInfoPageProps {
    hardwares: Hardware[];
    projects: Project[];
    objects: Object[];
    hts: HardwareType[];
    pts: ProjectType[];
    characteristics: Characteristic[];
}

export function HardwareInfoPage({
    hardwares,
    projects,
    objects,
    hts,
    pts,
    characteristics,
}: HardwareInfoPageProps) {
    const params = useParams();
    const hId = Number(params["hardware_id"]);
    const hardware = hardwares.find((e) => e.id === hId);

    if (hardware === undefined) {
        return <div className="content">Invalid hardware</div>;
    }

    const renderChs = (chs: Hardware_ch[]) => {
        return chs.map((ch) => (
            <p>
                {characteristics.find((c) => c.id == ch.ch_id).name} :{ch.value}{" "}
                {
                    characteristics
                        .find((c) => c.id == ch.ch_id)
                        .ums.find((um) => um.id == ch.ums_id).name
                }
            </p>
        ));
    };

    return (
        <div className="content">
            <h1>Просмотр оборудования</h1>
            <h1>{hardware.name}</h1>
            <p>
                Тип оборудования:{" "}
                {hts.find((e) => e.id === hardware.type_id).name}
            </p>
            <p>
                Марка: {hardware.brand}. Модель: {hardware.model}
            </p>
            <p>Описание: {hardware.description}</p>
            <p>Добавлено: {hardware.added}</p>
            <h1>Характеристики:</h1>
            {renderChs(hardware.chs)}
            <hr />
            <h1>Проекты:</h1>
            <div className="list">
                {projects.map((pr) =>
                    pr.hardwares.find((h) => h.id == hardware.id) ? (
                        <div key={pr.id} className={list_item}>
                            <div className={list_item_info}>{pr.name}</div>
                            <div className={list_item_info}>
                                {pts.find((e) => e.id === pr.type_id).name}
                            </div>
                        </div>
                    ) : (
                        ""
                    ),
                )}
            </div>
            <h1>Объекты:</h1>
            <div className="list">
                {objects.map((obj) =>
                    obj.hardwares.find((h) => h.id == hardware.id) ? (
                        <div key={obj.id} className={list_item}>
                            <div className={list_item_info}>{obj.name}</div>
                            <div className={list_item_info}>
                                {obj.registration_number}
                            </div>
                        </div>
                    ) : (
                        ""
                    ),
                )}
            </div>
        </div>
    );
}
