import "./page.css";
import { SaveButton, CompleteButton, CreateButton, AddButton } from "./../buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Project, ProjectType, Object, Hardware } from "../data_interfaces";
import { list_item, list_item_info } from "./../list_component.module.css";
import { useState, useEffect, useRef } from "react";
import { hardwares } from "../fake_backend_data";
import Modal from "../modal";
import "../modal.module.css";
import { ListTools } from "../list_tools";
import { useLocation } from "react-router-dom";

type FormValues = {
    name: string;
    type_id: number;
    description: string;
    hardwares: Hardware[];
};

export interface AddProjectFormProps {
    onAdd: (project: Project) => void;
    onEdit: (project: Project) => void;
    projectTypes: ProjectType[];
    objectsList: Object[];
    projectsList: Project[];
}

export function AddProjectForm({ onAdd, onEdit, projectTypes, objectsList, projectsList }: AddProjectFormProps) {
    const { resetField, register, handleSubmit } = useForm<FormValues>();
    const location = useLocation();
    var id = -1;
    if (location.state !== null) {
        id = location.state.id;
    }
    var add_hardwares = [] as Hardware[]
    console.log(id)
    if (id != -1) {
        let project = projectsList[projectsList.findIndex((a) => a.id == id)];
        console.log(project)
        add_hardwares = project.hardwares.map((element) => element);
        useEffect(() => {
            //setAddedUms(add_ums)
            resetField("name", { defaultValue: project.name });
            resetField("type_id", { defaultValue: project.type_id });
            resetField("description", { defaultValue: project.description });
        }, [project.name, project.type_id, project.description]);
    }
    console.log('add_hardwares', add_hardwares)
    const [addedHardwares, setAddedHardwares] = useState(add_hardwares);
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const project = {
            id: id,
            name: data.name,
            type_id: Number(data.type_id),
            description: data.description,
            hardwares: addedHardwares,
        } as Project;
        if (project.id == -1) onAdd(project);
        else onEdit(project);
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
            {id == -1 ? <h2>Новый проект</h2>: <h2>Редактирование проекта</h2>}
            <form id="edit_project_form" onSubmit={handleSubmit(onSubmit)}>
                <h3>Название</h3>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Название"
                    required
                />
                <h3>Тип</h3>
                <select
                    id="type"
                    {...register("type_id")}
                    defaultValue={projectTypes[0].id}
                >
                    {projectTypes.map((type) => {
                        return (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        );
                    })}
                </select>
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
        <div>
                { id != -1 ? (
                <div>
                    <hr/>
                    <h1>Объекты:</h1>
                    <div className="list">
                        {objectsList.map((obj) => ( obj.project_id == id ?
                            <div key={obj.id} className={list_item}>
                                <div className={list_item_info}>{obj.name}</div>
                                <div className={list_item_info}>{obj.registration_number}</div>
                            </div> : ''
                        ))}
                    </div>
                </div>
            ) : ''}
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

