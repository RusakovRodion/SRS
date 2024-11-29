import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import "./page.css";
import { ListTools } from "../list_tools";
import { ProjectType } from "../data_interfaces";

export interface ProjectTypesPageProps {
    projectTypesList: ProjectType[];
    onAdd: () => void;
    onView: (id: number) => void;
}

export function ProjectTypesPage({
    projectTypesList,
    onAdd,
    onView,
}: ProjectTypesPageProps) {
    return (
        <div className="content">
            <h2>Типы проектов</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <div className="list">
                {projectTypesList.map((projectType) => (
                    <div key={projectType.id} className={list_item}>
                        <div className={list_item_info}>{projectType.name}</div>
                        <ListTools onAdd={null} onView={() => onView(projectType.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
