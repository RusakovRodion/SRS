import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import { projects_table, table_row } from "../tables.module.css";
import "./page.css";
import { ProjectType } from "../data_interfaces";
import { ListTools } from "../list_tools";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../api/projects_api";
import { ErrorBanner, LoadingBanner } from "../status_banner";

export interface ProjectsPageProps {
    projectTypes: ProjectType[];
    onAdd: () => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function ProjectsPage({
    projectTypes,
    onAdd,
    onView,
    onEdit,
    onDelete,
}: ProjectsPageProps) {
    const projectsTypesQuery = useQuery({
        queryKey: ["project_types"],
        queryFn: getProjects,
    });

    if (projectsTypesQuery.error) {
        return <ErrorBanner />;
    }

    if (projectsTypesQuery.isLoading) {
        return <LoadingBanner />;
    }

    const projects = projectsTypesQuery.data ?? [];

    return (
        <div className="content">
            <h2>Проекты</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input type="search" placeholder="Поиск" />
            </div>

            <table className={projects_table}>
                {projects.map((project) => (
                    <tr key={project.id} className={table_row}>
                        <td>{project.name}</td>
                        <td>
                            {projectTypes.find((e) => e.id == project.type_id)
                                ?.name ?? "Неизвестный тип проекта"}
                        </td>
                        <td>
                            <ListTools
                                onView={() => onView(project.id)}
                                onEdit={() => onEdit(project.id)}
                                onDelete={() => onDelete(project.id)}
                            />
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
