import "./page.css";
import { useParams } from "react-router-dom";
import { Project, ProjectType, Object, HardwareType } from "../data_interfaces";
import { list_item, list_item_info } from "./../list_component.module.css";
import { useQuery } from "@tanstack/react-query";
import { getProjectById, getProjectTypes } from "../../api/projects_api";
import { ErrorBanner, LoadingBanner } from "../status_banner";
import { getObjectById, getObjects } from "../../api/objects_api";

export interface ProjectInfoPageProps {}

export function ProjectInfoPage({}: ProjectInfoPageProps) {
    const params = useParams();
    const projectId = Number(params["project_id"]);

    const projectQuery = useQuery({
        queryKey: [`project_${projectId}`],
        queryFn: () => getProjectById(projectId),
    });

    const objectsQuery = useQuery({
        queryKey: ["objects"],
        queryFn: getObjects,
    });

    const projectTypesQuery = useQuery({
        queryKey: ["project_types"],
        queryFn: getProjectTypes,
    });

    if (projectQuery.error || objectsQuery.error || projectTypesQuery.error) {
        return <ErrorBanner />;
    }

    if (
        projectQuery.isLoading ||
        objectsQuery.isLoading ||
        projectTypesQuery.isLoading
    ) {
        return <LoadingBanner />;
    }

    const project = projectQuery.data;
    if (project == undefined) {
        return <ErrorBanner text={"Проект не найден"} />;
    }

    // const objects = objectsQuery.data ?? [];
    const projectTypes = projectTypesQuery.data ?? [];
    const projectType = projectTypes.find((e) => e.id == project.type.id);

    return (
        <div className="content">
            <h1>Просмотр проекта</h1>
            <h1>{project.name}</h1>
            <p>Тип проекта: {projectType?.name}</p>
            <p>{project.description}</p>
            <h1>Оборудование:</h1>
            {project.hardware.map((h) => (
                <div key={h.hardware_id}>
                    <h2>
                        {h.type} {h.brand} {h.model}
                    </h2>
                    <p>{h.description}</p>
                </div>
            ))}
            <hr />
            {/*
            TODO: нужно исправить роут
            <h1>Объекты:</h1>
            <div className="list">
                {objects.map((object) =>
                    object.project_id == project.id ? (
                        <div key={object.id} className={list_item}>
                            <div className={list_item_info}>{object.name}</div>
                            <div className={list_item_info}>
                                {object.registration_number}
                            </div>
                        </div>
                    ) : (
                        ""
                    ),
                )}
            </div>
            */}
        </div>
    );
}
