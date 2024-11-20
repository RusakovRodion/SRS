import { AddButtonOnlyIcon, ChangesButtonOnlyIcon, AddButton, EditButtonOnlyIcon, DeleteButtonOnlyIcon, WatchButtonOnlyIcon } from "./buttons";
import { ListComponent } from './list_component'
import { Project } from './project'
import {
    list_item,
    list_item_info,
} from "./list_component.module.css";

import "./objects_page.css";
import "./list_component.module.css";


export function ProjectsPage() {
    const projects: Project[] = [
    {
      id: 1,
      name: 'project1',
      projectType: 'type1',
    },
    {
      id: 2,
      name: 'project2',
      projectType: 'type2',
    },
    {
      id: 3,
      name: 'project3',
      projectType: 'type1',
    },
    {
      id: 4,
      name: 'project4',
      projectType: 'type2',
    },
  ]
    return (
        <content>
            <h2>Проеты</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => console.log("add button")} />
                <input type="search" placeholder="Поиск"/>
            </div>
           <ListComponent<Project>
                options={projects}
                renderOption={(project) => (
                    <div className={list_item}>
                        <div className={list_item_info}>{project.name}</div>
                        <div className={list_item_info}>{project.projectType}</div>
                        <tools>
                            <AddButtonOnlyIcon onClick={() => console.log("add button")} />
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
