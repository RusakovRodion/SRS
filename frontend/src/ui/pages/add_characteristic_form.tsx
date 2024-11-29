import "./page.css";
import { Button, SaveButton, AddButton, CreateButton, CompleteButton } from "./../buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Project, ProjectType, Characteristic } from "../data_interfaces";
import { UM } from "../data_interfaces";
import { useState, useEffect, useRef } from "react";
import Modal from '../modal';
import "../modal.module.css"
import { ums } from "../fake_backend_data"
import { list_item, list_item_info } from "./../list_component.module.css";
import { ListTools } from "../list_tools";

let units_list : UM[] = []

type FormValues = {
    name: string;
    ums: UM[];
};

export interface AddChFormProps {
    onAdd: (ch: Characteristic) => void;
}

export function AddChForm({ onAdd }: AddChFormProps) {
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const ch = {
            id: -1,
            name: data.name,
            ums: units_list,
        } as Characteristic;
        console.log(units_list)
        units_list = []
        onAdd(ch)
    };
    const [isFromOpen, setFormOpen] = useState<boolean>(false);

     const handleOpenForm = () => {
        units_list = []
        InitialData.ums = []
        setFormOpen(true);
      };

      const handleCloseForm = () => {
        setFormOpen(false);
      };

      const handleFormSubmit = (data: AddUnitFormData): void => {
        units_list = data.ums
        handleCloseForm();
      };


    return (
        <div className="content">
            <h2>Новая характеристика</h2>
            <form id="add_ch_form" onSubmit={handleSubmit(onSubmit)}>
                <h3>Название</h3>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Название"
                    required
                />
                <div className={'label_and_add_button'}>
                    <label>Единицы измерения</label>
                    <AddButton onClick={handleOpenForm} />
                </div>
                <div className="list">
                    {units_list.map((um) => (
                        <div key={um.id} className={list_item}>
                            <div className={list_item_info}>{um.name}</div>
                            <ListTools onAdd={null} onView={null} onEdit={null} onChanges={null} onDelete={() => console.log(um.id)} />
                        </div>
                    ))}
           </div>
                <div className="save_btn_block">
                    <SaveButton/>
                </div>
            </form>
            <AddUnitForm
            isOpen={isFromOpen}
            onSubmit={handleFormSubmit}
            onClose={handleCloseForm} />
        </div>
    );
}

interface AddUnitFormData {
  ums: UM[]
}

let InitialData: AddUnitFormData = {
  ums: []
};

interface AddUnitFormProps {
  isOpen: boolean;
  onSubmit: (data: AddUnitFormData) => void;
  onClose: () => void;
}

const AddUnitForm: React.FC<AddUnitFormProps> = ({
  onSubmit,
  isOpen,
  onClose,
}) => {

  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<AddUnitFormData>(
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
    onSubmit(formState);
    setFormState(InitialData);
  };


  return (
    <Modal
      hasCloseBtn={false}
      isOpen={isOpen}
      onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label>Добавить единицу измерения</label>
        <div className={'label_and_add_button'}>
            <input type="search" placeholder="Поиск" />
            <CreateButton/>
        </div>
           <div className="list">
                    {ums.map((um) => (
                        <div key={um.id} className={list_item}>
                            <div className={list_item_info}>{um.name}</div>
                            <ListTools onAdd={() => formState.ums.push(ums[ums.findIndex(d => d.id === um.id)])} onView={null} onEdit={null} onChanges={null} onDelete={null} />
                        </div>
                    ))}
           </div>
        <div className="save_btn_block">
            <CompleteButton type="submit" onClick={handleSubmit}/>
        </div>
      </form>
    </Modal>
  );
};