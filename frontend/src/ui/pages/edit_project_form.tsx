import "./page.css";
import { projects, project_types } from "./../fake_backend_data";
import { SaveButton } from "./../buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Project } from "../data_interfaces";

type FormValues = {
    name: string;
    type: string;
    description: string;
};

function findProjectNextId(projects: Project[]) {
    return Math.max(...projects.map((project) => project.id)) + 1;
}

export interface EditProjectFormProps {
    mode: string;
}

export function EditProjectForm({ mode }: EditProjectFormProps) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        projects.push({
            id: findProjectNextId(projects),
            name: data["name"],
            type_id: Number(data["type"]),
            description: data["description"],
            added: "",
        } as Project);
        console.log(projects);
        navigate("/projects");
    };

    if (mode === "new") {
        return (
            <div className="content">
                <h2>Новый проект</h2>
                <form id="edit_project_form">
                    <h3>Название</h3>
                    <input
                        type="text"
                        id="name"
                        {...register("name")}
                        placeholder="Название"
                        required
                    />
                    <h3>Тип</h3>
                    <select id="type" {...register("type")}>
                        {project_types.map((type) => {
                            return (
                                <option value={type.id} selected={type.id == 1}>
                                    {type.name}
                                </option>
                            );
                        })}
                    </select>
                    <h3>Описание</h3>
                    <textarea
                        id="description"
                        {...register("description")}
                        rows={5}
                        placeholder="Описание"
                        required
                    />
                    <div className="save_btn_block">
                        <SaveButton onClick={handleSubmit(onSubmit)} />
                    </div>
                </form>
            </div>
        );
    } else
        return (
            <div className="content">
                <h2>Редактирование проекта</h2>
            </div>
        );
}
