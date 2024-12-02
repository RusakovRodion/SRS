import "./page.css";
import { useParams } from "react-router-dom";
import { Project, ProjectType, Object, HardwareType } from "../data_interfaces";
import { list_item, list_item_info } from "./../list_component.module.css";

export interface ProjectInfoPageProps {
    projects: Project[];
    objects: Object[];
    hts: HardwareType[];
    pts: ProjectType[];
}

export function ProjectInfoPage({ projects, objects, hts, pts }: ProjectInfoPageProps) {
    const params = useParams();
    const pId = Number(params["project_id"]);
    const project = projects.find((e) => e.id === pId);

    if (project === undefined) {
        return <div className="content">Invalid project</div>;
    }

    return (
        <div className="content">
            <h1>Просмотр проекта</h1>
            <h1>{project.name}</h1>
            <p>Тип проекта: {pts.find((e) => e.id === project.type_id).name}</p>
            <p>{project.description}</p>
            <h1>Оборудование:</h1>
            {project.hardwares.map((h) => (
                <div>
                    <h2>{h.name}</h2>
                    <p>Тип оборудования: {hts.find((e) => e.id === h.type_id).name}</p>
                    {hts.find((e) => e.id === h.type_id).chs.map((ch) => (
                        <p>{ch.name}: ???</p>
                    ))}
                </div>
                ))}
            <hr/>
            <h1>Объекты:</h1>
             <div className="list">
                {objects.map((obj) => ( obj.project_id == pId ?
                    <div key={obj.id} className={list_item}>
                        <div className={list_item_info}>{obj.name}</div>
                        <div className={list_item_info}>{obj.registration_number}</div>
                    </div> : ''
                ))}
            </div>
        </div>
    );
}
