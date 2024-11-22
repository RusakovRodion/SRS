import "./page.css";
import { useParams } from "react-router-dom";
import { Project } from "../data_interfaces";

export interface ProjectInfoPageProps {
    projects: Project[];
}

export function ProjectInfoPage({ projects }: ProjectInfoPageProps) {
    const params = useParams();
    const project = projects.find((e) => e.id === Number(params["project_id"]));

    if (project === undefined) {
        return <div className="content">Invalid project</div>;
    }

    return (
        <div className="content">
            <h2>Просмотр проекта</h2>
            <h1>{project.name}</h1>
            <p>{project.type_id}</p>
            <p>{project.description}</p>
        </div>
    );
}
