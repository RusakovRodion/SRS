import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { Project } from "../data_interfaces";
import { ListTools } from "../list_tools";

export interface ProjectsPageProps {
    projectsList: Project[];
    onAdd: () => void;
    onView: (id: number) => void;
}

export function ProjectsPage({
    projectsList,
    onAdd,
    onView,
}: ProjectsPageProps) {
    return (
        <div className="content">
            <h2>Проекты</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {projectsList.map((project) => (
                    <div key={project.id} className={list_item}>
                        <div className={list_item_info}>{project.name}</div>
                        <div className={list_item_info}>{project.type_id}</div>
                        <ListTools onView={() => onView(project.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
