import "./page.css";
import {
    Button,
    SaveButton,
    AddButton,
    CreateButton,
    CompleteButton,
} from "./../buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { HardwareType, Hardware, Characteristic } from "../data_interfaces";
import { UM } from "../data_interfaces";
import { useState, useEffect, useRef } from "react";
import Modal from "../modal";
import "../modal.module.css";
import { list_item, list_item_info } from "./../list_component.module.css";
import { ListTools } from "../list_tools";
import { useLocation } from "react-router-dom";
import { characteristics } from "../fake_backend_data";
import { Check } from "react-feather";

type FormValues = {
    name: string;
    chs: Characteristic[];
};

export interface AddHtFormProps {
    onAdd: (ht: HardwareType) => void;
    onEdit: (ht: HardwareType) => void;
    htList: HardwareType[];
    hardwareList: Hardware[];
}

export function AddHtForm({
    onAdd,
    onEdit,
    htList,
    hardwareList,
}: AddHtFormProps) {
    const { resetField, register, handleSubmit } = useForm<FormValues>();
    const location = useLocation();
    var id = -1;
    if (location.state !== null) {
        id = location.state.id;
    }
    var input_val = "";
    var add_chs = [] as Characteristic[]
    console.log(id)
    if (id != -1) {
        let ht = htList[htList.findIndex((a) => a.id == id)];
        console.log(ht)
        input_val = ht.name;
        add_chs = ht.chs.map((element) => element);
        useEffect(() => {
            //setAddedUms(add_ums)
            resetField("name", { defaultValue: input_val });
        }, [input_val, ht.chs]);
    }
    const [addedChs, setAddedChs] = useState(add_chs);
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const ht = {
            id: id,
            name: data.name,
            chs: addedChs,
        } as HardwareType;
        if (ht.id == -1) onAdd(ht);
        else onEdit(ht);
    };
    const [isFromOpen, setFormOpen] = useState<boolean>(false);

    const handleDel = (id:number) => {
        let index = addedChs.findIndex(
            (d) => d.id === id,
        );
        let addedChs_del = [...addedChs.slice(0, index), ...addedChs.slice(index + 1)]
        setAddedChs(addedChs_del)
    }

    const handleOpenForm = () => {
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = (data: Characteristic[]): void => {
        setAddedChs(data);
        handleCloseForm();
    };

    return (
        <>
        <div className="content">
            <form id="add_ht_form" onSubmit={handleSubmit(onSubmit)}>
                <h3>Название</h3>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Название"
                    required
                />
                <div className={"label_and_add_button"}>
                    <label>Характеристики</label>
                    <AddButton onClick={handleOpenForm} />
                </div>
                <div className="list" {...register("chs")}>
                    {addedChs.map((ch) => (
                        <div key={ch.id} className={list_item}>
                            <div className={list_item_info}>{ch.name}</div>
                            <ListTools onDelete={() => handleDel(ch.id)} />
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
                chsList={characteristics}
                addedChsList={addedChs}
            />
        </div>
        <div>
                { id != -1 ? (
                <div>
                    <hr/>
                    <h1>Оборудование:</h1>
                    <div className="list">
                        {hardwareList.map((h) => ( h.type_id == id ?
                            <div key={h.id} className={list_item}>
                                <div className={list_item_info}>{h.name}</div>
                                <div className={list_item_info}>{h.type_id}</div>
                                <div className={list_item_info}>{h.brand}</div>
                                <div className={list_item_info}>{h.model}</div>
                            </div> : ''
                        ))}
                    </div>
                </div>
            ) : ''}
        </div>
        </>
    );
}

interface AddUnitFormProps {
    isOpen: boolean;
    onSubmit: (data: Characteristic[]) => void;
    onClose: () => void;
    chsList: Characteristic[];
    addedChsList: Characteristic[];
}

const AddUnitForm = ({
    onSubmit,
    isOpen,
    onClose,
    chsList,
    addedChsList,
}: AddUnitFormProps) => {
    const focusInputRef = useRef<HTMLInputElement | null>(null);
    const [addedChs1, setAddedChs1] = useState(addedChsList);
    useEffect(() => {
        setAddedChs1(addedChsList)
    }, [addedChsList]);

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
        setAddedChs1((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        onSubmit(addedChs1);
    };

    const handleAdd = (id:number) => {
        let index = chsList.findIndex(
            (d) => d.id === id,
        );
        /* NOTE: В реакте все обновления стейта должны быть только через функции стейта */
        setAddedChs1(
            addedChs1.concat([chsList[index]])
        );
    }
    const handleDel = (id:number) => {
        let index = addedChs1.findIndex(
            (d) => d.id === id,
        );
        if (addedChs1.length == 1) {
            setAddedChs1([])
        }
        else {
            let addedChs_del = [...addedChs1.slice(0, index), ...addedChs1.slice(index + 1)]
            setAddedChs1(addedChs_del)
        }
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
                    {chsList.map((ch) => ( 
                        <div key={ch.id} className={list_item} >
                            <div className={list_item_info}>{ch.name}</div>

                            {/* Если элемент уже есть в addedUms, то вместо кнопок показываем иконку с галочкой */}
                            {addedChs1.findIndex((added) => added.id == ch.id) !=
                            -1 ? (
                                <ListTools
                                    onDelete={() => {
                                        handleDel(ch.id)
                                    }}
                                />
                            ) : (
                                <ListTools
                                    onAdd={() => {
                                        handleAdd(ch.id)
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
