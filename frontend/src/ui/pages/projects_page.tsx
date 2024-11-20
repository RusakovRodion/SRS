import { AddButtonOnlyIcon, ChangesButtonOnlyIcon, AddButton, EditButtonOnlyIcon, DeleteButtonOnlyIcon, WatchButtonOnlyIcon }
    from "./../buttons";
import { ListComponent } from './../list_component'
import { Project } from './../project'
import {
    list_item,
    list_item_info,
} from "./../list_component.module.css";

import "./page.css";
import "./../list_component.module.css";
import { useNavigate  } from "react-router-dom";
import {projects } from "./../fake_backend_data"


export function ProjectsPage() {
    const navigate = useNavigate();
    return (
        <content>
            <h2>Проекты</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => console.log("add button")} />
                <input type="search" placeholder="Поиск"/>
            </div>
           <ListComponent<Project>
                options={projects}
                renderOption={(project) => (
                    <div className={list_item}>
                        <div className={list_item_info}>{project.name}</div>
                        <div className={list_item_info}>{project.type_id}</div>
                        <tools>
                            <AddButtonOnlyIcon onClick={() => console.log("add button")} />
                            <ChangesButtonOnlyIcon onClick={() => console.log("changes button")} />
                            <WatchButtonOnlyIcon onClick={() => navigate("/" + project.id)} />
                            <EditButtonOnlyIcon onClick={() => console.log("edit button")} />
                            <DeleteButtonOnlyIcon onClick={() => console.log("delete button")} />
                        </tools>
                    </div>
                )}
           />
        </content>
    );
}
