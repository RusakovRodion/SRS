import { Button, SaveButton, CompleteButton, CreateButton, AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { Object, Project } from "../data_interfaces";
import { ListTools } from "../list_tools";
import Modal from "../modal";
import { useState, useEffect, useRef } from "react";
import { projects } from "../fake_backend_data";
import { button, icon_button } from "../buttons.module.css";

export interface ObjectPageProps {
    objectsList: Object[];
    onAdd: () => void;
    onView: (id: number) => void;
}

export function ObjectsPage({ objectsList, onAdd, onView }: ObjectPageProps) {
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
                        <div className={list_item_info}>{object.project_id}</div>
                        <div className={list_item_info}>{object.registration_number}</div>
                        <ListTools onAdd={null} onView={() => onView(object.id)} />
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
                    <Button className={button} text={"Без проекта +"} onClick={() => {handleAdd(-1)}} type={'button'}/>
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


