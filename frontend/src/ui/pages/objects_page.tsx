import { ChangesButtonOnlyIcon, AddButton, EditButtonOnlyIcon, DeleteButtonOnlyIcon, WatchButtonOnlyIcon } from "./../buttons";
import { ListComponent } from './../list_component'
import { Object } from './../object'
import {
    list_item,
    list_item_info,
} from "./../list_component.module.css";

import "./page.css";
import "./../list_component.module.css";


export function ObjectsPage() {
    const objects: Object[] = [
    {
      id: 1,
      name: 'object1',
      projectId: 1,
      regNumber: "hg12"
    },
    {
      id: 2,
      name: 'object2',
      projectId: 3,
      regNumber: "hg112"
    },
  ]
    return (
        <content>
            <h2>Объекты</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => console.log("add button")} />
                <input type="search" placeholder="Поиск"/>
            </div>
           <ListComponent<Object>
                options={objects}
                renderOption={(object) => (
                    <div className={list_item}>
                        <div className={list_item_info}>{object.name}</div>
                        <div className={list_item_info}>{object.projectId}</div>
                        <div className={list_item_info}>{object.regNumber}</div>
                        <tools>
                            <ChangesButtonOnlyIcon onClick={() => console.log("changes button")} />
                            <WatchButtonOnlyIcon onClick={() => console.log("watch button")} />
                            <EditButtonOnlyIcon onClick={() => console.log("edit button")} />
                            <DeleteButtonOnlyIcon onClick={() => console.log("delete button")} />
                        </tools>
                    </div>
                )}
           />
        </content>
    );
}
