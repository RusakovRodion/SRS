import { ChangesButtonOnlyIcon, AddButton, EditButtonOnlyIcon, DeleteButtonOnlyIcon, WatchButtonOnlyIcon } from "./../buttons";
import { ListComponent } from './../list_component'
import { Hardware, HardwareType } from './../hardware'
import {
    list_item,
    list_item_info,
} from "./../list_component.module.css";

import "./page.css";
import "./../list_component.module.css";
import {hardwares, hardware_types } from "./../fake_backend_data"


export function HardwarePage() {
    return (
        <div className="content">
            <h2>Оборудование</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => console.log("add button")} />
                <input type="search" placeholder="Поиск"/>
            </div>
           <ListComponent<Object>
                options={hardwares}
                renderOption={(hardware) => (
                    <div className={list_item}>
                        <div className={list_item_info}>{hardware.name}</div>
                        <div className={list_item_info}>{hardware_types.find(e => e.id == hardware.type_id)['name']}</div>
                        <div className={list_item_info}>{hardware.brand}</div>
                        <div className={list_item_info}>{hardware.model}</div>
                        <tools>
                            <ChangesButtonOnlyIcon onClick={() => console.log("changes button")} />
                            <WatchButtonOnlyIcon onClick={() => console.log("watch button")} />
                            <EditButtonOnlyIcon onClick={() => console.log("edit button")} />
                            <DeleteButtonOnlyIcon onClick={() => console.log("delete button")} />
                        </tools>
                    </div>
                )}
           />
        </div>
    );
}