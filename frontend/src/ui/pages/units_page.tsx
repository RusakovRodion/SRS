import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { ListTools } from "../list_tools";
import { UM } from "../data_interfaces";
import AddUnitForm, {
  AddUnitFormData,
} from '../add_unit_form';
import { useState } from "react";

export interface UnitsPageProps {
    unitsList: UM[];
    onAdd: (um: UM) => void;
    onView: (id: number) => void;
}

export function UnitsPage({ unitsList, onAdd, onView }: UnitsPageProps) {
     const [isFromOpen, setFormOpen] = useState<boolean>(false);

      const handleOpenForm = () => {
        setFormOpen(true);
      };

      const handleCloseForm = () => {
        setFormOpen(false);
      };

      const handleFormSubmit = (data: AddUnitFormData): void => {
        console.log(data);
        const um = {
            name: data.name,
            accuracy: data.accuracy,
        } as UM;

        onAdd(um);
        handleCloseForm();
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
                        <ListTools onView={() => onView(unit.id)} onEdit={()=> handleOpenForm()} />
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
