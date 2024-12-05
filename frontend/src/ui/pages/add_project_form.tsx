import "./page.css";
import {
    SaveButton,
    CompleteButton,
    CreateButton,
    AddButton,
} from "./../buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Project, ProjectType, Object, Hardware } from "../data_interfaces";
import { list_item, list_item_info } from "./../list_component.module.css";
import { useState, useEffect, useRef } from "react";
import { hardwares } from "../fake_backend_data";
import "../modal.module.css";
import { ListTools } from "../list_tools";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectTypes } from "../../api/projects_api";
import { ErrorBanner, LoadingBanner } from "../status_banner";
import { getHardwares } from "../../api/hardware_api";
import { Modal } from "../modal2";
import { table, table_row } from "../tables.module.css";
import clsx from "clsx";

type FormValues = {
    name: string;
    type_id: number;
    description: string;
    hardwares: Hardware[];
};

export interface AddProjectFormProps {
    onAdd: (project: Project) => void;
    onEdit: (project: Project) => void;
    objectsList: Object[];
    projectsList: Project[];
}

export function AddProjectForm({
    onAdd,
    onEdit,
    objectsList,
    projectsList,
}: AddProjectFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [typeId, setTypeId] = useState(0);

    const location = useLocation();
    var id = -1;
    if (location.state !== null) {
        id = location.state.id;
    }
    var add_hardwares = [] as Hardware[];
    console.log(id);
    if (id != -1) {
        let project = projectsList[projectsList.findIndex((a) => a.id == id)];
        console.log(project);
        add_hardwares = project.hardwares.map((element) => element);
    }
    console.log("add_hardwares", add_hardwares);
    const [addedHardwares, setAddedHardwares] = useState(add_hardwares);
    const [isHardwareFormOpen, setHardwareFormOpen] = useState(false);

    const handleDel = (id: number) => {
        let index = addedHardwares.findIndex((d) => d.id === id);
        let addedChs_del = [
            ...addedHardwares.slice(0, index),
            ...addedHardwares.slice(index + 1),
        ];
        setAddedHardwares(addedChs_del);
    };

    const handleOpenForm = () => {
        setHardwareFormOpen(true);
    };

    const handleCloseForm = () => {
        setHardwareFormOpen(false);
    };

    const handleFormSubmit = (data: Hardware[]): void => {
        setAddedHardwares(data);
        handleCloseForm();
    };

    const projectTypesQuery = useQuery({
        queryKey: ["project_types"],
        queryFn: getProjectTypes,
    });

    if (projectTypesQuery.error) {
        return <ErrorBanner />;
    }

    if (projectTypesQuery.isLoading) {
        return <LoadingBanner />;
    }

    const newProject = id == -1;
    const projectTypes = projectTypesQuery.data ?? [];

    return (
        <>
            {isHardwareFormOpen && (
                <AddHardwareForm
                    onSubmit={handleFormSubmit}
                    onClose={handleCloseForm}
                    addedHardwaresList={addedHardwares}
                />
            )}

            <div className="content">
                {newProject ? (
                    <h2>Новый проект</h2>
                ) : (
                    <h2>Редактирование проекта</h2>
                )}
                <form
                    id="edit_project_form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <h3>Название</h3>
                    <input
                        type="text"
                        id="name"
                        placeholder="Название"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <h3>Тип</h3>
                    <select id="type">
                        {projectTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <h3>Описание</h3>
                    <textarea
                        id="description"
                        rows={10}
                        placeholder="Описание"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className={"label_and_add_button"}>
                        <label>Оборудование</label>
                        <AddButton onClick={handleOpenForm} />
                    </div>
                    <div className="list">
                        {addedHardwares.map((h) => (
                            <div key={h.id} className={list_item}>
                                <div className={list_item_info}>{h.name}</div>
                                <div className={list_item_info}>
                                    {h.type_id}
                                </div>
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
            </div>
            <div>
                {id != -1 ? (
                    <div>
                        <hr />
                        <h1>Объекты:</h1>
                        <div className="list">
                            {objectsList.map((obj) =>
                                obj.project_id == id ? (
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

interface AddHardwareFormProps {
    onSubmit: (data: Hardware[]) => void;
    onClose: () => void;
    addedHardwaresList: Hardware[];
}

const AddHardwareForm = ({
    onSubmit,
    onClose,
    addedHardwaresList,
}: AddHardwareFormProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const hardwaresQuery = useQuery({
        queryKey: ["hardwares"],
        queryFn: getHardwares,
    });

    const [addedHardwares1, setAddedHardwares1] = useState(addedHardwaresList);

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

    const handleAdd = (id: number) => {
        let index = hardwaresList.findIndex((d) => d.id === id);
        /* NOTE: В реакте все обновления стейта должны быть только через функции стейта */
        setAddedHardwares1(addedHardwares1.concat([hardwaresList[index]]));
    };
    const handleDel = (id: number) => {
        let index = addedHardwares1.findIndex((d) => d.id === id);
        if (addedHardwares1.length == 1) {
            setAddedHardwares1([]);
        } else {
            let addedHardwares_del = [
                ...addedHardwares1.slice(0, index),
                ...addedHardwares1.slice(index + 1),
            ];
            setAddedHardwares1(addedHardwares_del);
        }
    };

    if (hardwaresQuery.error) {
        return (
            <Modal onClose={() => onClose()} showCloseButton={true}>
                <ErrorBanner />
            </Modal>
        );
    }

    if (hardwaresQuery.isLoading) {
        return (
            <Modal onClose={() => {}} showCloseButton={false}>
                <LoadingBanner />
            </Modal>
        );
    }

    const hardwaresList = hardwaresQuery.data ?? [];

    return (
        <Modal onClose={() => onClose()} showCloseButton={true}>
            <label>Добавить оборудование</label>
            <div className={"label_and_add_button"}>
                <input
                    type="search"
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <CreateButton onClick={() => {}} />
            </div>
            <div style={{ height: 300, overflowY: "scroll" }}>
                <table className={table}>
                    {hardwaresList.map((h) => {
                        const isAdded =
                            addedHardwares1.findIndex(
                                (added) => added.id == h.id,
                            ) != -1;

                        if (
                            searchQuery == "" ||
                            h.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            h.brand
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            h.model
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                        ) {
                            return (
                                <tr key={h.id} className={table_row}>
                                    <td>{h.type_id}</td>
                                    <td>{h.brand}</td>
                                    <td>{h.model}</td>
                                    {/* Если элемент уже есть в addedUms, то вместо кнопок показываем иконку с галочкой */}
                                    <td>
                                        {isAdded ? (
                                            <ListTools
                                                onDelete={() => {
                                                    handleDel(h.id);
                                                }}
                                            />
                                        ) : (
                                            <ListTools
                                                onAdd={() => {
                                                    handleAdd(h.id);
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </table>
            </div>
            <div className="save_btn_block">
                <CompleteButton type="submit" onClick={handleSubmit} />
            </div>
        </Modal>
    );
};
