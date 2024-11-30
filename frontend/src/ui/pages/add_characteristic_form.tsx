import "./page.css";
import {
    Button,
    SaveButton,
    AddButton,
    CreateButton,
    CompleteButton,
} from "./../buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Project, ProjectType, Characteristic } from "../data_interfaces";
import { UM } from "../data_interfaces";
import { useState, useEffect, useRef } from "react";
import Modal from "../modal";
import "../modal.module.css";
import { list_item, list_item_info } from "./../list_component.module.css";
import { ListTools } from "../list_tools";
import { useLocation } from "react-router-dom";
import { ums } from "../fake_backend_data";
import { Check } from "react-feather";

let units_list: UM[] = [];

type FormValues = {
    name: string;
    ums: UM[];
};

export interface AddChFormProps {
    onAdd: (ch: Characteristic) => void;
    onEdit: (ch: Characteristic) => void;
    characteristicList: Characteristic[];
}

export function AddChForm({
    onAdd,
    onEdit,
    characteristicList,
}: AddChFormProps) {
    const { resetField, register, handleSubmit } = useForm<FormValues>();
    const location = useLocation();
    var id = -1;
    if (location.state !== null) {
        id = location.state.id;
    }
    var input_val = "";
    if (id != -1) {
        let ch =
            characteristicList[characteristicList.findIndex((a) => a.id == id)];
        console.log(characteristicList);
        console.log("finding_ch:", ch);
        input_val = ch.name;
        units_list = ch.ums;
        useEffect(() => {
            resetField("name", { defaultValue: input_val });
        }, [input_val]);
    }
    console.log(
        "id:",
        id,
        ", units_list:",
        units_list,
        ", state:",
        useForm.state,
    );

    //console.log(FormValues)
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const ch = {
            id: id,
            name: data.name,
            ums: units_list,
        } as Characteristic;
        console.log("data", data.ums);
        units_list = [];
        if (ch.id == -1) onAdd(ch);
        else onEdit(ch);
    };
    const [isFromOpen, setFormOpen] = useState<boolean>(false);

    const handleOpenForm = () => {
        console.log("id:", id, ", units_list:", units_list);
        units_list = [];
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = (data: UM[]): void => {
        units_list = data;
        handleCloseForm();
    };

    return (
        <div className="content">
            <form id="add_ch_form" onSubmit={handleSubmit(onSubmit)}>
                <h3>Название</h3>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Название"
                    required
                />
                <div className={"label_and_add_button"}>
                    <label>Единицы измерения</label>
                    <AddButton onClick={handleOpenForm} />
                </div>
                <div className="list" {...register("ums")}>
                    {units_list.map((um) => (
                        <div key={um.id} className={list_item}>
                            <div className={list_item_info}>{um.name}</div>
                            <ListTools onDelete={() => console.log(um.id)} />
                        </div>
                    ))}
                </div>
                <div className="save_btn_block">
                    <SaveButton />
                </div>
            </form>
            <AddUnitForm
                isOpen={isFromOpen}
                onSubmit={handleFormSubmit}
                onClose={handleCloseForm}
                umsList={ums}
            />
        </div>
    );
}

interface AddUnitFormProps {
    isOpen: boolean;
    onSubmit: (data: UM[]) => void;
    onClose: () => void;
    umsList: UM[];
}

const AddUnitForm = ({
    onSubmit,
    isOpen,
    onClose,
    umsList,
}: AddUnitFormProps) => {
    const focusInputRef = useRef<HTMLInputElement | null>(null);
    const [addedUms, setAddedUms] = useState(new Array<UM>());

    useEffect(() => {
        if (isOpen && focusInputRef.current) {
            setTimeout(() => {
                focusInputRef.current!.focus();
            }, 0);
        }
    }, [isOpen]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ): void => {
        const { name, value } = event.target;
        setAddedUms((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        onSubmit(addedUms);
    };

    return (
        <Modal hasCloseBtn={false} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <label>Добавить единицу измерения</label>
                <div className={"label_and_add_button"}>
                    <input type="search" placeholder="Поиск" />
                    <CreateButton onClick={() => {}} />
                </div>
                <div className="list">
                    {umsList.map((um) => (
                        <div key={um.id} className={list_item}>
                            <div className={list_item_info}>{um.name}</div>

                            {/* Если элемент уже есть в addedUms, то вместо кнопок показываем иконку с галочкой */}
                            {addedUms.findIndex((added) => added.id == um.id) >=
                            0 ? (
                                <Check />
                            ) : (
                                <ListTools
                                    onAdd={() => {
                                        let index = umsList.findIndex(
                                            (d) => d.id === um.id,
                                        );

                                        /* NOTE: В реакте все обновления стейта должны быть только через функции стейта */
                                        setAddedUms(
                                            addedUms.concat([umsList[index]]),
                                        );
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="save_btn_block">
                    <CompleteButton type="submit" onClick={handleSubmit} />
                </div>
            </form>
        </Modal>
    );
};
