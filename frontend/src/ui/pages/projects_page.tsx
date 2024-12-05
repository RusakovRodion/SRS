import { AddButton } from "./../buttons";
import { list_item, list_item_info } from "./../list_component.module.css";
import { projects_table, table_row } from "../tables.module.css";
import "./page.css";
import { ProjectType } from "../data_interfaces";
import { ListTools } from "../list_tools";
import { useQuery } from "@tanstack/react-query";
import {
    deleteProjectById,
    getProjects,
    getProjectTypes,
} from "../../api/projects_api";
import { ErrorBanner, LoadingBanner } from "../status_banner";
import { useState } from "react";

export interface ProjectsPageProps {
    onAdd: () => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function ProjectsPage({
    onAdd,
    onView,
    onEdit,
    onDelete,
}: ProjectsPageProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const projectsQuery = useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
    });

    const projectTypesQuery = useQuery({
        queryKey: ["project_types"],
        queryFn: getProjectTypes,
    });

    if (projectsQuery.error || projectTypesQuery.error) {
        return <ErrorBanner />;
    }

    if (projectsQuery.isLoading || projectTypesQuery.isLoading) {
        return <LoadingBanner />;
    }

    const projects = projectsQuery.data ?? [];
    const projectTypes = projectTypesQuery.data ?? [];

    const deleteProject = async (id: number) => {
        try {
            if (confirm(`Удалить проект?`)) {
                deleteProjectById(id);
                onDelete(id);
                projectsQuery.refetch();
            }
        } catch (error) {
            console.error(error);
            alert("Не получилось удалить проект");
        }
    };

    return (
        <div className="content">
            <h2>Проекты</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => onAdd()} />
                <input
                    type="search"
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <table className={projects_table}>
                {projects.map((project) => {
                    const projectType = projectTypes.find(
                        (e) => e.id == project.type_id,
                    );

                    if (
                        searchQuery == "" ||
                        project.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        projectType?.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    ) {
                        return (
                            <tr key={project.id} className={table_row}>
                                <td>{project.name}</td>
                                <td>
                                    {projectType?.name ??
                                        "Неизвестный тип проекта"}
                                </td>
                                <td>
                                    <ListTools
                                        onView={() => onView(project.id)}
                                        onEdit={() => onEdit(project.id)}
                                        onDelete={() =>
                                            deleteProject(project.id)
                                        }
                                    />
                                </td>
                            </tr>
                        );
                    } else {
                        return null;
                    }
                })}
            </table>
        </div>
    );
}
