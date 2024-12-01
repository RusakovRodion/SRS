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
    var add_ums = [] as UM[]
    if (id != -1) {
        let ch = characteristicList[characteristicList.findIndex((a) => a.id == id)];
        input_val = ch.name;
        add_ums = ch.ums.map((element) => element);
        useEffect(() => {
            //setAddedUms(add_ums)
            resetField("name", { defaultValue: input_val });
        }, [input_val, ch.ums]);
    }
    const [addedUms, setAddedUms] = useState(add_ums);
    console.log("addedUms on form:", addedUms)
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const ch = {
            id: id,
            name: data.name,
            ums: addedUms,
        } as Characteristic;
        if (ch.id == -1) onAdd(ch);
        else onEdit(ch);
    };
    const [isFromOpen, setFormOpen] = useState<boolean>(false);

    const handleDel = (id:number) => {
        console.log("before delete on main form:")
        console.log("addedUms:", addedUms)
        let index = addedUms.findIndex(
            (d) => d.id === id,
        );
        /*if (addedUms.length == 1) {
            setAddedUms([])
        }
        else {
            let addedUms_del = addedUms.splice(index - 1, 1)
            setAddedUms(addedUms_del)
        }*/
        let addedUms_del = [...addedUms.slice(0, index), ...addedUms.slice(index + 1)]
        console.log("addedUms_del:", addedUms_del)
        setAddedUms(addedUms_del)
        console.log("delete index:", index)
        console.log("after delete on main form::  ")
        console.log("addedUms:", addedUms)
    }

    const handleOpenForm = () => {
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = (data: UM[]): void => {
        setAddedUms(data);
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
                    {console.log("addedUmsbeforeList:", addedUms)}
                    {addedUms.map((um) => (
                        <div key={um.id} className={list_item}>
                            <div className={list_item_info}>{um.name}</div>
                            <ListTools onDelete={() => handleDel(um.id)} />
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
                addedUmsList={addedUms}
            />
        </div>
    );
}

interface AddUnitFormProps {
    isOpen: boolean;
    onSubmit: (data: UM[]) => void;
    onClose: () => void;
    umsList: UM[];
    addedUmsList: UM[];
}

const AddUnitForm = ({
    onSubmit,
    isOpen,
    onClose,
    umsList,
    addedUmsList,
}: AddUnitFormProps) => {
    const focusInputRef = useRef<HTMLInputElement | null>(null);
    const [addedUms1, setAddedUms1] = useState(addedUmsList);
    console.log("addedUms1 on modalform:", addedUms1)
    console.log("addedUmsList on modalform:", addedUmsList)
    useEffect(() => {
        setAddedUms1(addedUmsList)
    }, [addedUmsList]);

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
        setAddedUms1((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        onSubmit(addedUms1);
    };

    const handleAdd = (id:number) => {
        console.log("before add on main form::  ")
        console.log("addedUms1:", addedUms1)
        let index = umsList.findIndex(
            (d) => d.id === id,
        );
        /* NOTE: В реакте все обновления стейта должны быть только через функции стейта */
        setAddedUms1(
            addedUms1.concat([umsList[index]])
        );
        console.log("after add on main form::  ")
        console.log("addedUms1:", addedUms1)
    }
    const handleDel = (id:number) => {
        console.log("before delete on main form::  ")
        console.log("addedUms1:", addedUms1)
        let index = addedUms1.findIndex(
            (d) => d.id === id,
        );
        if (addedUms1.length == 1) {
            setAddedUms1([])
        }
        else {
            let addedUms_del = [...addedUms1.slice(0, index), ...addedUms1.slice(index + 1)]
            setAddedUms1(addedUms_del)
        }
        console.log("after delete on main form::  ")
        console.log("addedUms1:", addedUms1)
    }

    return (
        <Modal hasCloseBtn={false} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <label>Добавить единицу измерения</label>
                <div className={"label_and_add_button"}>
                    <input type="search" placeholder="Поиск" />
                    <CreateButton onClick={() => {}} />
                </div>
                <div className="list" >
                    {umsList.map((um) => (
                        <div key={um.id} className={list_item} >
                            <div className={list_item_info}>{um.name}</div>

                            {/* Если элемент уже есть в addedUms, то вместо кнопок показываем иконку с галочкой */}
                            {addedUms1.findIndex((added) => added.id == um.id) !=
                            -1 ? (
                                <ListTools
                                    onDelete={() => {
                                        handleDel(um.id)
                                    }}
                                />
                            ) : (
                                <ListTools
                                    onAdd={() => {
                                        handleAdd(um.id)
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
