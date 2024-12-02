import { Button, SaveButton, CompleteButton, CreateButton, AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import {Hardware, Object, Project } from "../data_interfaces";
import { ListTools } from "../list_tools";
import Modal from "../modal";
import "../modal.module.css";
import { useState, useEffect, useRef } from "react";
import { projects, hardwares } from "../fake_backend_data";
import { button, icon_button } from "../buttons.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import "../modal.module.css";

export interface ObjectPageProps {
    objectsList: Object[];
    projectsList: Project[]
    onAdd: (id: number) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
}

export function ObjectsPage({ objectsList, projectsList, onAdd, onView, onEdit }: ObjectPageProps) {
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const handleOpenForm = () => {
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = (prId: number): void => {
        console.log(prId)
        handleCloseForm();
        onAdd(prId)
    };
    return (
        <div className="content">
            <h2>Объекты</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => handleOpenForm()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {objectsList.map((object) => (
                    <div key={object.id} className={list_item}>
                        <div className={list_item_info}>{object.name}</div>
                        <div className={list_item_info}>{projectsList[projectsList.findIndex((p) => p.id == object.project_id)].name}</div>
                        <div className={list_item_info}>{object.registration_number}</div>
                        <ListTools onAdd={null} onView={() => onView(object.id)} onEdit={() => onEdit(object.id)} />
                    </div>
                ))}
            </div>
            <AddProjectForm
                isOpen={isFormOpen}
                onSubmit={handleFormSubmit}
                onClose={handleCloseForm}
                projectsList={projects}
            />
        </div>
    );
}

interface AddProjectFormProps {
    isOpen: boolean;
    onSubmit: (data: number) => void;
    onClose: () => void;
    projectsList: Project[];
}

const AddProjectForm = ({
    onSubmit,
    isOpen,
    onClose,
    projectsList,
}: AddProjectFormProps) => {
    const handleAdd = (id: number): void => {
        onSubmit(id)
    };

    return (
        <Modal hasCloseBtn={false} isOpen={isOpen} onClose={onClose}>
            <form>
                <label>Выбрать проект</label>
                <div className={"label_and_add_button"}>
                    <input type="search" placeholder="Поиск" />
                    <Button className={button} text={"Без проекта +"} onClick={() => {handleAdd(null)}} type={'button'}/>
                </div>
                <div className="list" >
                    {projectsList.map((p) => (
                        <div key={p.id}  className={list_item} >
                            <div className={list_item_info}>{p.name}</div>
                            <div className={list_item_info}>{p.type_id}</div>
                            <ListTools onAdd={() => {handleAdd(p.id)}}/>
                        </div>
                    ))}
                </div>
            </form>
        </Modal>
    );
};

type FormValues = {
    name: string;
    project_id: number;
    registration_number: string;
    description: string;
    hardwares: Hardware[];
};

export interface AddObjectFormProps {
    onAdd: (object: Object) => void;
    onEdit: (object: Object) => void;
    projects: Project[];
    objects: Object[];
}

export function AddObjectForm({ onAdd, onEdit, projects, objects}: AddObjectFormProps) {
    const { resetField, register, handleSubmit } = useForm<FormValues>();
    const location = useLocation();
    var id = -1;
    var objId = -1;
    var add_hardwares = [] as Hardware[]
    if (location.state !== null) {
        if(location.state.id) {
            id = location.state.id;
            add_hardwares = projects[projects.findIndex((p) => p.id == id)].hardwares.map((element) => element);
        }
         if(location.state.objId) objId = location.state.objId;

    }
    if (objId != -1) {
        let object = objects[objects.findIndex((a) => a.id == objId)];
        console.log(object)
        add_hardwares = object.hardwares.map((element) => element);
        useEffect(() => {
            //setAddedUms(add_ums)
            resetField("name", { defaultValue: object.name });
            resetField("description", { defaultValue: object.description });
            resetField("project_id", { defaultValue: object.project_id });
            resetField("registration_number", { defaultValue: object.registration_number });
        }, [object.name, object.description, object.project_id, object.description]);
    }
    console.log('id', id)
    console.log('objid', objId)

    const [addedHardwares, setAddedHardwares] = useState(add_hardwares);

    function handleChange(event) {
        add_hardwares = projects[projects.findIndex((p) => p.id == Number(event.target.value))].hardwares.map((element) => element);
        setAddedHardwares(add_hardwares);
    };
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const object = {
            id: objId,
            name: data.name,
            description: data.description,
            project_id: Number(data.project_id),
            registration_number: data.registration_number,
            added: "",
            hardwares: addedHardwares,
        } as Object;
        if (object.id == -1) onAdd(object);
        else onEdit(object);
    };
    const [isFromOpen, setFormOpen] = useState<boolean>(false);

    const handleDel = (id:number) => {
        let index = addedHardwares.findIndex(
            (d) => d.id === id,
        );
        let addedChs_del = [...addedHardwares.slice(0, index), ...addedHardwares.slice(index + 1)]
        setAddedHardwares(addedChs_del)
    }

    const handleOpenForm = () => {
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
    };

    const handleFormSubmit = (data: Hardware[]): void => {
        setAddedHardwares(data);
        handleCloseForm();
    };

    return (
        <>
        <div className="content">
            {objId == -1 ? <h2> Новый объект </h2>: <h2>Редактирование объекта</h2>}
            <form id="edit_project_form" onSubmit={handleSubmit(onSubmit)}>
                <h3>Проект</h3>
                <select
                    id="project_id"
                    onInput={handleChange}
                    {...register("project_id")}
                    defaultValue={id != -1? id: null}
                    >
                    {projects.map((p) => {
                        return (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        );
                    })}
                </select>
                <h3>Название</h3>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Название"
                    required
                />
                <h3>Регистрационный номер</h3>
                <input
                    type="text"
                    id="registration_number"
                    {...register("registration_number")}
                    placeholder="Регистрационный номер"
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
                    <label>Оборудование</label>
                    <AddButton onClick={handleOpenForm} />
                </div>
                <div className="list" {...register("hardwares")}>
                    {addedHardwares.map((h) => (
                        <div key={h.id} className={list_item}>
                            <div className={list_item_info}>{h.name}</div>
                            <div className={list_item_info}>{h.type_id}</div>
                            <div className={list_item_info}>{h.brand}</div>
                            <div className={list_item_info}>{h.model}</div>
                            <ListTools onDelete={() => handleDel(h.id)} />
                        </div>
                    ))}
                </div>
                <div className="save_btn_block">
                    <SaveButton />
                </div>
            </form>
            <AddHardwareForm
                isOpen={isFromOpen}
                onSubmit={handleFormSubmit}
                onClose={handleCloseForm}
                hardwaresList={hardwares}
                addedHardwaresList={addedHardwares}
            />
        </div>

        </>
    );
}

interface AddHardwareFormProps {
    isOpen: boolean;
    onSubmit: (data: Hardware[]) => void;
    onClose: () => void;
    hardwaresList: Hardware[];
    addedHardwaresList: Hardware[];
}

const AddHardwareForm = ({
    onSubmit,
    isOpen,
    onClose,
    hardwaresList,
    addedHardwaresList,
}: AddHardwareFormProps) => {
    const focusInputRef = useRef<HTMLInputElement | null>(null);
    const [addedHardwares1, setAddedHardwares1] = useState(addedHardwaresList);
    useEffect(() => {
        setAddedHardwares1(addedHardwaresList)
    }, [addedHardwaresList]);

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
        setAddedHardwares1((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        onSubmit(addedHardwares1);
    };

    const handleAdd = (id:number) => {
        let index = hardwaresList.findIndex(
            (d) => d.id === id,
        );
        /* NOTE: В реакте все обновления стейта должны быть только через функции стейта */
        setAddedHardwares1(
            addedHardwares1.concat([hardwaresList[index]])
        );
    }
    const handleDel = (id:number) => {
        let index = addedHardwares1.findIndex(
            (d) => d.id === id,
        );
        if (addedHardwares1.length == 1) {
            setAddedHardwares1([])
        }
        else {
            let addedHardwares_del = [...addedHardwares1.slice(0, index), ...addedHardwares1.slice(index + 1)]
            setAddedHardwares1(addedHardwares_del)
        }
    }

    return (
        <Modal hasCloseBtn={false} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <label>Добавить оборудование</label>
                <div className={"label_and_add_button"}>
                    <input type="search" placeholder="Поиск" />
                    <CreateButton onClick={() => {}} />
                </div>
                <div className="list" >
                    {hardwaresList.map((h) => (
                        <div key={h.id} className={list_item} >
                            <div className={list_item_info}>{h.name}</div>
                            <div className={list_item_info}>{h.type_id}</div>
                            <div className={list_item_info}>{h.brand}</div>
                            <div className={list_item_info}>{h.model}</div>
                            {console.log("addedHardwares1",addedHardwares1)}
                            {/* Если элемент уже есть в addedUms, то вместо кнопок показываем иконку с галочкой */}
                            {addedHardwares1.findIndex((added) => added.id == h.id) !=
                            -1 ? (
                                <ListTools
                                    onDelete={() => {
                                        handleDel(h.id)
                                    }}
                                />
                            ) : (
                                <ListTools
                                    onAdd={() => {
                                        handleAdd(h.id)
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


