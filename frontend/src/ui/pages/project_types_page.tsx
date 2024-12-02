import { AddButton, SaveButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { ListTools } from "../list_tools";
import {Project, ProjectType } from "../data_interfaces";
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../modal';
import "../modal.module.css"
import { useParams } from "react-router-dom";

export interface ProjectTypesPageProps {
    projectTypesList: ProjectType[];
    onAdd: (pt: ProjectType) => void;
    onView: (id: number) => void;
    onEdit: (id: number, pt: ProjectType) => void;
    onDelete: (id: number) => void;
}

export function ProjectTypesPage({
    projectTypesList,
    onAdd,
    onView,
    onEdit,
    onDelete,
}: ProjectTypesPageProps) {
    const [isFromOpen, setFormOpen] = useState<boolean>(false);

    const handleOpenForm = (pt: ProjectType) => {
        if (pt !== undefined) {
            InitialData.id = pt.id
            InitialData.name = pt.name
        }
        setFormOpen(true);
      };

      const handleCloseForm = () => {
        setFormOpen(false);
        InitialData.id = -1
        InitialData.name = ''
      };

      const handleFormSubmit = (data: AddPtFormData): void => {
        console.log(data)
        const pt = {
            id: -1,
            name: data.name,
        } as ProjectType;
        if (data.id == -1){
            onAdd(pt);
            handleCloseForm();
        }
        else {
            console.log(data.id)
            onEdit(data.id, pt);
            handleCloseForm();
        }
      };

    return (
        <div className="content">
            <h2>Типы проектов</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => handleOpenForm()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {projectTypesList.map((projectType) => (
                    <div key={projectType.id} className={list_item}>
                        <div className={list_item_info}>{projectType.name}</div>
                        <ListTools onAdd={null} onView={() => onView(projectType.id)} onEdit={()=> handleOpenForm(projectType)} onDelete={() => onDelete(projectType.id)} />
                    </div>
                ))}
            </div>
            <AddPtForm
            isOpen={isFromOpen}
            onSubmit={handleFormSubmit}
            onClose={handleCloseForm} />
        </div>
    );
}

export interface AddPtFormData {
  id: number
  name: string;
}

export let InitialData: AddPtFormData = {
  id: -1,
  name:'',
};

interface AddPtFormProps {
  isOpen: boolean;
  onSubmit: (data: AddPtFormData) => void;
  onClose: () => void;
}

export const AddPtForm: React.FC<AddPtFormProps> = ({
  onSubmit,
  isOpen,
  onClose,
}) => {

  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<AddPtFormData>(
    InitialData
  );

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    formState.id = InitialData.id
    onSubmit(formState);
    setFormState(InitialData);
  };


  return (
    <Modal
      hasCloseBtn={false}
      isOpen={isOpen}
      onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Название</label>
          <input
            ref={focusInputRef}
            type="text"
            id="name"
            name="name"
            placeholder={'Название'}
            value={formState.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="save_btn_block">
          <SaveButton type="submit">Сохранить</SaveButton>
        </div>
      </form>
    </Modal>
  );
};

export interface PtInfoPageProps {
    pts: ProjectType[];
    projectList: Project[];
}

export function PtInfoPage({ pts, projectList }: PtInfoPageProps) {
    const params = useParams();
    const ptId = Number(params["project_type_id"])
    const pt = pts.find((e) => e.id === ptId)
    if (pt === undefined) {
        return <div className="content">Invalid pt</div>;
    }

    return (
        <div className="content">
            <h2>Просмотр типа оборудования: {pt.name}</h2>
            <hr/>
            <h1>Проекты:</h1>
             <div className="list">
                {projectList.map((p) => ( p.type_id == ptId ?
                    <div key={p.id} className={list_item}> 
                        <div className={list_item_info}>{p.name}</div>
                        <div className={list_item_info}>{p.type_id}</div>
                    </div> : ''
                ))}
            </div>
        </div>
    );
}






