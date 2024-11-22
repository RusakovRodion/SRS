import "./page.css";
import { useParams } from "react-router-dom";
import { projects } from "./../fake_backend_data";

export function ProjectInfoPage() {
    const params = useParams();
    const project = projects.find((e) => e.id === Number(params["project_id"]));

    return (
        <div className="content">
            <h2>Просмотр проекта</h2>
            <h1>{project.name}</h1>
            <p>{project.type_id}</p>
            <p>{project.description}</p>
        </div>
    );
}
