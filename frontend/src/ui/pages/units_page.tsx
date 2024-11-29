import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { ListTools } from "../list_tools";
import { UM } from "../data_interfaces";
import AddUnitForm,  {
  AddUnitFormData, InitialData
} from '../add_unit_form';
import { useState } from "react";

export interface UnitsPageProps {
    unitsList: UM[];
    onAdd: (um: UM) => void;
    onView: (id: number) => void;
    onEdit: (id: number, um: UM) => void;
    onDelete: (id: number) => void;
}

export function UnitsPage({ unitsList, onAdd, onView, onEdit, onDelete }: UnitsPageProps) {
     const [isFromOpen, setFormOpen] = useState<boolean>(false);


      const handleOpenForm = (um: UM) => {
        if (um !== undefined) {
            InitialData.id = um.id
            InitialData.name = um.name
            InitialData.accuracy = um.accuracy
        }
        setFormOpen(true);
      };

      const handleCloseForm = () => {
        setFormOpen(false);
        InitialData.id = -1
        InitialData.name = ''
        InitialData.accuracy = ''
      };

      const handleFormSubmit = (data: AddUnitFormData): void => {
        console.log(data)
        const um = {
            id: -1,
            name: data.name,
            accuracy: data.accuracy,
        } as UM;
        if (data.id == -1){
            onAdd(um);
            handleCloseForm();
        }
        else {
            console.log(data.id)
            onEdit(data.id, um);
            handleCloseForm();
        }
      };

    return (
        <div className="content">
            <h2>Единицы измерения</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => handleOpenForm()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {unitsList.map((unit) => (
                    <div key={unit.id} className={list_item}>
                        <div className={list_item_info}>{unit.name}</div>
                        <div className={list_item_info}>{unit.accuracy}</div>
                        <ListTools onAdd={null} onView={null} onEdit={()=> handleOpenForm(unit)} onDelete={() => onDelete(unit.id)} />
                    </div>
                ))}
            </div>
            <AddUnitForm
            isOpen={isFromOpen}
            onSubmit={handleFormSubmit}
            onClose={handleCloseForm} />
        </div>
    );
}
