import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { Project, ProjectType } from "../data_interfaces";
import { ListTools } from "../list_tools";

export interface ProjectsPageProps {
    projectsList: Project[];
    pts: ProjectType[];
    onAdd: () => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function ProjectsPage({
    projectsList,
    pts,
    onAdd,
    onView,
    onEdit,
    onDelete,
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
                        <div className={list_item_info}>
                            {pts.find((e) => e.id == project.type_id).name}
                        </div>
                        <ListTools
                            onView={() => onView(project.id)}
                            onEdit={() => onEdit(project.id)}
                            onDelete={() => onDelete(project.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
